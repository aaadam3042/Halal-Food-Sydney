import { Box, Chip } from "@mui/material";

export function MapFilters() {
    return(
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "start", 
        alignContent: "center", width: "95vw", gap: 1.5}}>
            <Chip label="Restaurants" />
            <Chip label="Butchers" />
        </Box>
    );
}

export default MapFilters;