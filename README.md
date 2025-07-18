# Halal Food Sydney

A mobile-first web app for discovering halal food locations in Sydney, with a focus on *hand-slaughtered (zabīḥa)* options. Built to help the local Muslim community make informed dining decisions with up-to-date halal verification data.

---

## 📦 Tech Stack

- **Frontend**: React (NextJS) + Tailwind CSS (mobile-first design) + MaterialUI
- **Backend**: Firebase (Firestore + Authentication)
- **Map**: Google Maps

---

## 🌟 Features

### 🧍 For General Users
- View halal restaurants and butchers on a map and in a list
- Filter by halal status (general / hand-slaughtered), type, and distance
- Tap pins or entries to view detailed info: address, suppliers, last update, notes
- Propose new entries or suggest edits (requires Google login)
- Flag incorrect information with an explanation
- Mobile-first, no installation required

### 🛠️ For Admins
- Approve or reject user-submitted entries
- Edit and update listings
- Review flagged entries and proposed changes
- Quick, mobile-optimized dashboard interface

---

## 🚧 MVP Goals

- Minimal, clean interface
- Easy data contribution (through verified users)
- Cheap to host and maintain
- Designed to scale beyond Sydney if needed

---

## 🗺️ Pages

- `/` → Home map with halal locations
- `/list` → Scrollable list of entries with filters
- `/settings` → Help, glossary, and login status
- `/listing/:id` → Detailed view of a single entry
- `/admin` → Admin dashboard (restricted access)

---

## 🚀 Getting Started (Development)

```bash
git clone https://github.com/your-username/halal-food-sydney.git
cd halal-food-sydney
npm install
npm run start
```

---

## 🔐 Authentication

Google login via Firebase Authentication is required to propose entries or access admin features. No email/password login supported.

---

## ☪️ About

This app is being built to help Muslim communities make informed decisions about halal food, especially regarding hand-slaughtered meat, in a way that’s accurate, respectful, and locally maintained.

## Attribution

This app uses some data from the Geocoding Nominatim API -> © OpenStreetMap