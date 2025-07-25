import { db } from '@/config/firebase';
import { FoodService, FoodServiceArray } from '@/types/foodService';
import { collection, getDocs, query, where } from 'firebase/firestore';

const FoodServices = collection(db, 'FoodServices');

// Get documents within a given radius forming a bounding box around a given location
// Lng and Lat are stored in documents in { geolocation: { longitude: number, latitude: number } } format
// Given radius should be in kilometers
export const getFoodServicesInRadius = async (lng: number, lat: number, radius: number) => {

    // Approximate bounding box radius from kilometers to degrees
    const radiusInDegrees = radius / 111.32;

    const q = query(
        FoodServices,
        where('geolocation.longitude', '>=', lng - radiusInDegrees),
        where('geolocation.longitude', '<=', lng + radiusInDegrees),
        where('geolocation.latitude', '>=', lat - radiusInDegrees),
        where('geolocation.latitude', '<=', lat + radiusInDegrees)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        throw new Error('No food services found');
    }   
    const foodServices = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    const result = FoodServiceArray.parse(foodServices);
    return result.sort((a, b) => a.name.localeCompare(b.name));
};

// Get all food services
export const getAllFoodServices = async () => {
    const querySnapshot = await getDocs(FoodServices);
    // Handle promise rejection 
    if (querySnapshot.empty) {
        throw new Error('No food services found');
    }   

    const foodServices = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    const result = FoodServiceArray.parse(foodServices);
    return result.sort((a, b) => a.name.localeCompare(b.name));
}

// Get all restaurants
export const getAllRestaurants = async () => {
    const q = query(FoodServices, where('type', '==', 'restaurant'));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        throw new Error('No food services found');
    }   
    const restaurants = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    const result = FoodServiceArray.parse(restaurants);
    return result.sort((a, b) => a.name.localeCompare(b.name));
}

// Get all butchers
export const getAllButchers = async () => {
    const q = query(FoodServices, where('type', '==', 'butcher'));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        throw new Error('No food services found');
    }   
    const butchers = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    const result = FoodServiceArray.parse(butchers);
    return result.sort((a, b) => a.name.localeCompare(b.name));
}

// TODO: On snapshot this stuff to keep updated.