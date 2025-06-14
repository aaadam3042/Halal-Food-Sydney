import { Box, Chip } from "@mui/material";

export function LocationFilters() {
    return(
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "start", 
        alignContent: "center", width: "95vw", gap: 1.5}}>
            <Chip label="Restaurants" sx={{boxShadow: '2'}} />
            <Chip label="Butchers" sx={{boxShadow: '2'}}  />
        </Box>
    );
}

export default LocationFilters;