# Attribution: OpenStreetMap Nominatim API | © OpenStreetMap

import firebase_admin
import google.cloud
from firebase_admin import credentials, firestore
import csv
import re
import logging
import requests
import time
from datetime import datetime
from typing import Dict, List, Optional, Tuple

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Initialize Firebase
cred = credentials.Certificate("./hfs-firebaseadmin-key.json")
firebase_admin.initialize_app(cred)

store = firestore.client()
doc_ref = store.collection('FoodServices')

def parse_contact_info(contact_str: str) -> Tuple[str, str, str]:
    """Parse contact string to extract address, phone, and website."""
    if not contact_str:
        return "", "", ""
    
    # Phone number patterns
    phone_patterns = [
        r'\b0\d{1,2}\s?\d{4}\s?\d{4}\b',  # Australian mobile/landline
        r'\b\d{4}\s?\d{3}\s?\d{3}\b',     # 1300 numbers
        r'\b0\d{2}\s?\d{3}\s?\d{3}\b',    # Alternative format
    ]
    
    # Website patterns
    website_patterns = [
        r'https?://[^\s]+',
        r'www\.[^\s]+',
        r'[^\s]+\.com(?:\.au)?(?:/[^\s]*)?',
        r'[^\s]+\.org(?:\.au)?(?:/[^\s]*)?'
    ]
    
    phone = ""
    website = ""
    address = contact_str.strip()
    
    # Extract phone
    for pattern in phone_patterns:
        match = re.search(pattern, contact_str)
        if match:
            phone = match.group().strip()
            address = address.replace(phone, "").strip()
            break
    
    # Extract website
    for pattern in website_patterns:
        match = re.search(pattern, contact_str)
        if match:
            website = match.group().strip()
            address = address.replace(website, "").strip()
            break
    
    # Clean up address
    address = re.sub(r'\s+', ' ', address).strip()
    address = address.strip(',').strip()
    
    return address, phone, website

def parse_coordinates(coord_str: str) -> Optional[Dict]:
    """Parse coordinate string and return geopoint."""
    if not coord_str:
        return None
    
    # Extract coordinates from formats like "(-33.7543819, 150.8098721)"
    pattern = r'\((-?\d+\.?\d*),\s*(-?\d+\.?\d*)\)'
    match = re.search(pattern, coord_str)
    
    if match:
        lat = float(match.group(1))
        lng = float(match.group(2))
        return {"latitude": lat, "longitude": lng}
    
    return None

def parse_status(status_str: str) -> Tuple[str, str]:
    """Parse status string to get handslaughter and general halal status."""
    if not status_str:
        return "", "Pending Review"
    
    status_str = status_str.strip()
    
    # Extract everything before the first "-" or the whole string if no "-"
    if " - " in status_str:
        handslaughter = status_str.split(" - ")[0].strip()
    else:
        handslaughter = status_str
    
    # Normalize capitalization
    handslaughter = handslaughter.title()
    
    # Set General Halal status
    if handslaughter.lower() in ["confirmed", "verified"]:
        general_halal = "Confirmed"
    else:
        general_halal = "Pending Review"
    
    return handslaughter, general_halal

def parse_suppliers(supplier_str: str) -> List[str]:
    """Parse supplier string and return list of suppliers."""
    if not supplier_str:
        return []
    
    # Split by & and clean up
    suppliers = re.split(r'\s*&\s*', supplier_str)
    suppliers = [s.strip() for s in suppliers if s.strip()]
    
    return suppliers

def format_date(date_str: str) -> str:
    """Format date string to dd/mm/yyyy format."""
    if not date_str:
        return ""
    
    date_str = date_str.strip()
    
    # Try to parse common date formats
    formats = [
        "%d/%m/%Y",
        "%d/%m/%y",
        "%d-%m-%Y",
        "%d-%m-%y",
        "%Y-%m-%d",
        "%m/%d/%Y",
        "%m/%d/%y"
    ]
    
    for fmt in formats:
        try:
            dt = datetime.strptime(date_str, fmt)
            return dt.strftime("%d/%m/%Y")
        except ValueError:
            continue
    
    # If no format matches, try to extract numbers and format
    numbers = re.findall(r'\d+', date_str)
    if len(numbers) == 3:
        day, month, year = numbers
        if len(year) == 2:
            year = "20" + year
        try:
            dt = datetime(int(year), int(month), int(day))
            return dt.strftime("%d/%m/%Y")
        except ValueError:
            pass
    
    return date_str  # Return original if can't parse

def get_coordinates_from_address(address: str) -> Optional[Dict]:
    # Attribution: OpenStreetMap Nominatim API | © OpenStreetMap
    """Fetch coordinates from OpenStreetMap Nominatim API, respecting usage policy."""
    if not address:
        return ""

    logger.info(f"Fetching coordinates for address: {address}")
    # Respect Nominatim usage policy: max 1 request/sec
    time.sleep(1)

    url = f'https://nominatim.openstreetmap.org/search?q={address}&format=json&limit=1'
    headers = {
        "User-Agent": "HalalFoodSydneyUploader/1.0 (contact: aaadam3042@gmail.com)",
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        if not data:
            logger.warning("No results from geocoding API for address: %s", address)
            return ""
        lat = data[0].get('lat')
        lon = data[0].get('lon')
        if lat and lon:
            # Attribution required by ODbL: OpenStreetMap contributors
            logger.info("Coordinates fetched from OpenStreetMap Nominatim (ODbL © OpenStreetMap contributors)")
            return f"({lat}, {lon})"
        else:
            logger.warning("Missing lat/lon in geocoding API response for address: %s", address)
            return ""
    except Exception as e:
        logger.error(f"Error fetching coordinates for address {address}: {str(e)}")
        return ""

def create_status_history(last_contact: str, handslaughter_status: str) -> List[Dict]:
    """Create initial status history entry."""
    if not last_contact or not handslaughter_status:
        return []
    
    formatted_date = format_date(last_contact)
    if not formatted_date:
        return []
    
    return [{
        "Date": formatted_date,
        "Status": f"{handslaughter_status} - Handslaughter"
    }]

def process_butchers_csv(filename: str) -> List[Dict]:
    """Process butchers CSV file."""
    logger.info(f"Processing butchers CSV: {filename}")
    documents = []
    
    with open(filename, 'r', encoding='utf-8') as file:
        reader = csv.reader(file)
        
        # Skip header lines
        for _ in range(6):
            next(reader)
        
        # Process data rows
        for row_num, row in enumerate(reader, start=7):
            if len(row) < 7:  # Skip incomplete rows
                continue
            
            name = row[0].strip() if row[0] else ""
            if not name or name=="Butcher Name":  # Skip rows without names
                logger.warning(f"Skipping row {row_num}: No name provided")
                continue
            
            contact_details = row[1].strip() if row[1] else ""
            status = row[2].strip() if row[2] else ""
            meat_supplier = row[3].strip() if row[3] else ""
            chicken_supplier = row[4].strip() if row[4] else ""
            last_contacted = row[5].strip() if row[5] else ""
            notes = row[6].strip() if row[6] else ""
            coordinates = row[7].strip() if len(row) > 7 and row[7] else ""
            
            # Parse contact information
            address, phone, website = parse_contact_info(contact_details)

            # Get coords from address if coords are not provided
            coordinates = get_coordinates_from_address(address) if not coordinates else coordinates
            
            # Parse status
            handslaughter_status, general_halal_status = parse_status(status)
            
            # Parse suppliers
            meat_suppliers = parse_suppliers(meat_supplier)
            chicken_suppliers = parse_suppliers(chicken_supplier)
            
            # Parse coordinates
            geolocation = parse_coordinates(coordinates)
            
            # Format date
            formatted_date = format_date(last_contacted)
            
            # Create document
            doc = {
                "name": name,
                "type": "Butcher"
            }
            
            # Add address if exists
            if address:
                doc["address"] = address
            
            # Add contact map if phone or website exists
            contact_map = {}
            if phone:
                contact_map["phone"] = phone
            if website:
                contact_map["website"] = website
            if contact_map:
                doc["contact"] = contact_map
            
            # Add status map
            status_map = {}
            if handslaughter_status:
                status_map["handslaughtered"] = handslaughter_status
            if general_halal_status:
                status_map["generalHalal"] = general_halal_status
            if status_map:
                doc["status"] = status_map
            
            # Add suppliers
            if meat_suppliers:
                doc["meatSupplier"] = meat_suppliers
            if chicken_suppliers:
                doc["chickenSupplier"] = chicken_suppliers
            
            # Add last contacted
            if formatted_date:
                doc["lastContact"] = formatted_date
            
            # Add notes
            if notes:
                doc["notes"] = notes
            
            # Add geolocation
            if geolocation:
                doc["geolocation"] = geolocation
            
            # Add status history
            status_history = create_status_history(last_contacted, handslaughter_status)
            if status_history:
                doc["statusHistory"] = status_history
            
            documents.append(doc)
            logger.info(f"Processed butcher: {name}")
    
    logger.info(f"Processed {len(documents)} butchers from CSV")
    return documents

def process_restaurants_csv(filename: str) -> List[Dict]:
    """Process restaurants CSV file."""
    logger.info(f"Processing restaurants CSV: {filename}")
    documents = []
    
    with open(filename, 'r', encoding='utf-8') as file:
        reader = csv.reader(file)
        
        # Skip header lines
        for _ in range(6):
            next(reader)
        
        # Process data rows
        for row_num, row in enumerate(reader, start=7):
            if len(row) < 7:  # Skip incomplete rows
                continue
            
            name = row[0].strip() if row[0] else ""
            if not name or name=="Restaurant Name":  # Skip rows without names
                logger.warning(f"Skipping row {row_num}: No name provided")
                continue
            
            address = row[1].strip() if row[1] else ""
            status = row[2].strip() if row[2] else ""
            # Skip row[3] - "Supplier" column
            meat_source = row[4].strip() if len(row) > 4 and row[4] else ""
            chicken_source = row[5].strip() if len(row) > 5 and row[5] else ""
            last_contacted = row[6].strip() if len(row) > 6 and row[6] else ""
            notes = row[7].strip() if len(row) > 7 and row[7] else ""
            coordinates = row[8].strip() if len(row) > 8 and row[8] else ""
            
            # Parse contact information from address (might contain phone/website)
            cleaned_address, phone, website = parse_contact_info(address)

            # Get coords from address if coords are not provided
            coordinates = get_coordinates_from_address(cleaned_address) if not coordinates else coordinates
            
            # Parse status
            handslaughter_status, general_halal_status = parse_status(status)
            
            # Parse suppliers
            meat_suppliers = parse_suppliers(meat_source)
            chicken_suppliers = parse_suppliers(chicken_source)
            
            # Parse coordinates
            geolocation = parse_coordinates(coordinates)
            
            # Format date
            formatted_date = format_date(last_contacted)
            
            # Create document
            doc = {
                "name": name,
                "type": "Restaurant"
            }
            
            # Add address if exists
            if cleaned_address:
                doc["address"] = cleaned_address
            
            # Add contact map if phone or website exists
            contact_map = {}
            if phone:
                contact_map["phone"] = phone
            if website:
                contact_map["website"] = website
            if contact_map:
                doc["contact"] = contact_map
            
            # Add status map
            status_map = {}
            if handslaughter_status:
                status_map["handslaughtered"] = handslaughter_status
            if general_halal_status:
                status_map["generalHalal"] = general_halal_status
            if status_map:
                doc["status"] = status_map
            
            # Add suppliers
            if meat_suppliers:
                doc["meatSupplier"] = meat_suppliers
            if chicken_suppliers:
                doc["chickenSupplier"] = chicken_suppliers
            
            # Add last contacted
            if formatted_date:
                doc["lastContact"] = formatted_date
            
            # Add notes
            if notes:
                doc["notes"] = notes
            
            # Add geolocation
            if geolocation:
                doc["geolocation"] = geolocation
            
            # Add status history
            status_history = create_status_history(last_contacted, handslaughter_status)
            if status_history:
                doc["statusHistory"] = status_history
            
            documents.append(doc)
            logger.info(f"Processed restaurant: {name}")
    
    logger.info(f"Processed {len(documents)} restaurants from CSV")
    return documents

def clear_collection():
    """Clear all documents from the FoodServices collection."""
    logger.info("Clearing FoodServices collection...")
    
    # Get all documents
    docs = doc_ref.stream()
    
    # Delete in batches
    batch = store.batch()
    count = 0
    
    for doc in docs:
        batch.delete(doc.reference)
        count += 1
        
        # Commit batch every 500 documents
        if count % 500 == 0:
            batch.commit()
            batch = store.batch()
            logger.info(f"Deleted {count} documents...")
    
    # Commit remaining documents
    if count % 500 != 0:
        batch.commit()
    
    logger.info(f"Cleared {count} documents from FoodServices collection")

def upload_documents(documents: List[Dict]):
    """Upload documents to Firebase in batches."""
    logger.info(f"Uploading {len(documents)} documents to Firebase...")
    
    # Upload in batches of 500 (Firestore limit)
    for i in range(0, len(documents), 500):
        batch = store.batch()
        batch_docs = documents[i:i+500]
        
        for doc_data in batch_docs:
            doc_ref_new = doc_ref.document()  # Auto-generate ID
            batch.set(doc_ref_new, doc_data)
        
        batch.commit()
        logger.info(f"Uploaded batch {i//500 + 1}: {len(batch_docs)} documents")
    
    logger.info(f"Successfully uploaded {len(documents)} documents")

def main():
    """Main function to process CSVs and upload to Firebase."""
    logger.info("Starting Firebase CSV upload process...")
    
    try:
        # Clear existing collection
        clear_collection()
        
        # Process both CSV files
        butchers_docs = process_butchers_csv("Halal Food Sydney (HFS) - Food Log - Butchers.csv")
        restaurants_docs = process_restaurants_csv("Halal Food Sydney (HFS) - Food Log - Restaurants.csv")
        
        # Combine all documents
        all_documents = butchers_docs + restaurants_docs
        
        logger.info(f"Total documents to upload: {len(all_documents)}")
        
        # Upload to Firebase
        upload_documents(all_documents)
        
        logger.info("Firebase upload process completed successfully!")
        
    except Exception as e:
        logger.error(f"Error during upload process: {str(e)}")
        raise

if __name__ == "__main__":
    main()