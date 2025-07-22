"use client";

import { Box, Chip } from "@mui/material";
import { cardColour } from "./detailcard";

export enum LocationFiltersTypes {
    Butcher, Restaurant
}

export function LocationFilters({filters, setFilters}: {filters: LocationFiltersTypes[], setFilters: (filters: LocationFiltersTypes[]) => void}) {
    var butcherColour = (filters.includes(LocationFiltersTypes.Butcher)) ? cardColour.Butcher : "transparent";
    var restaurantColour = (filters.includes(LocationFiltersTypes.Restaurant)) ? cardColour.Restaurant : "transparent";

    const handleFilterChange = (type: LocationFiltersTypes) => {
        if (filters.includes(type)) {
            setFilters(filters.filter(filter => filter !== type));
        } else {
            setFilters([...filters, type]);
        }
    }

    return(
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "start", 
        alignContent: "center", width: "95vw", gap: 1.5}}>
            <Chip label="Restaurants" onClick={() => {handleFilterChange(LocationFiltersTypes.Restaurant)}} sx={{boxShadow: '2', 
            border: `3px solid ${cardColour.Restaurant}`, ':hover': { background: `${cardColour.Restaurant}`}, background: `${restaurantColour}`}} />

            <Chip label="Butchers" onClick={() => {handleFilterChange(LocationFiltersTypes.Butcher)}} sx={{boxShadow: '2', 
            border: `3px solid ${cardColour.Butcher}`, ':hover': { background: `${cardColour.Butcher}`}, background: `${butcherColour}`}} />
        </Box>
    );
}

export default LocationFilters;