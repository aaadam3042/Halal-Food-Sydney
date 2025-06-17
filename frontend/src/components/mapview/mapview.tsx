'use client';

import { Paper } from "@mui/material";

export function MapView() {
    // Map should span the whole screen with padding
    // Card pops up when you click location over bottom side of map

    // API Key for Google Maps or set to empty string if not available
    const Maps_API_Key = process.env.GOOGLE_MAPS_API_KEY || "";

    // TODO: Integrate an actual map - THIS IS JUST A PLACEHOLDER

    return (
        <Paper elevation={2} sx={{backgroundColor: "white", height: "90%", width: "95vw", 
        borderRadius: "10px", backgroundImage: "url('/map-placeholder.png')",
        backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",}}>
            
            {/* <APIProvider apiKey={Maps_API_Key}>
                <Map
                    style={{ width: "100vw", height: "100vh" }}
                    defaultCenter={{ lat: -33.8688, lng: 151.2093 }} // Sydney coordinates
                    defaultZoom={12}
                    gestureHandling={"cooperative"} // Allows for both panning and zooming
                    disableDefaultUI={true} // Hides default UI controls
                />
            </APIProvider> */}

        </Paper>
    );
}

export default MapView;