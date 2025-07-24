'use client';

import React, { useState } from "react";
import { DetailCard, cardColour } from "@/components/detailcard";
import { LocationFilters, LocationFiltersTypes } from "@/components/locationfilters";
import SearchBar from "@/components/searchbar";
import SummaryDetails from "@/components/summarydetails";
import { Box, CircularProgress, List, ListItem, Paper, Typography } from "@mui/material";
import { getAllFoodServices } from "@/lib/services/dataService";
import { FoodService } from "@/types/foodService";

export default function ListPage() {
    // TODO: Consider if we want to add location bar here. The logic may be no as we just list all in alphabetical order. Use map for location based
    const [locationFilters, setLocationFilters] = React.useState<LocationFiltersTypes[]>([LocationFiltersTypes.Restaurant, LocationFiltersTypes.Butcher]);
    const [dbData, setDbData] = React.useState<FoodService[]>();
    const [hasLoadedData, setHasLoadedData] = useState(false);

    React.useEffect(() => {
        getAllFoodServices().then((data) => {
            // If data is empty, we can handle it here
            if (!data || data.length === 0) {
                throw new Error("No food services found");
            }
            setDbData(data);
            setHasLoadedData(true);
        }).catch((error) => {
            console.error("Error fetching food services:", error);
        });
    }, []);

    const filteredData = React.useMemo(() => {
        if (!dbData) return [];
        return dbData.filter(item => locationFilters.includes(item.type as LocationFiltersTypes))
    }, [dbData, locationFilters])

    const [cardData, setCardData] = React.useState<{
        foodService: FoodService;
        active: boolean;
    }>();

    const handleOpenCard = (foodService: FoodService) => { 
        setCardData({foodService, active: true});
    };

    const handleCloseCard = () => {
        setCardData((prev) => {
            if (!prev) return prev;
            return {...prev, active: false};
            });
    };

    return (
        <Box sx={{ position: "fixed", top: 64, left: 0, width: "100vw", height: "calc(100vh - 64px - 56px)", 
        overflow: "hidden", display: "flex", flexDirection:"column", justifyContent: "space-evenly", 
        alignItems: "center", backgroundImage: "url(/geometric-background.png)",
        backgroundSize: "30%", backgroundPosition: "center", backgroundRepeat: "repeat"}}>
            <LocationFilters filters={locationFilters} setFilters={setLocationFilters} />

            <SearchBar />

            <Paper elevation={3} sx={{ borderRadius: "10px", zIndex:1}}>
            <List sx={{ height: "70vh", overflow: 'auto', overflowX:'hidden', width: "25rem", bgcolor: "background.paper", color: "black", margin: "5px" }}>
                {(hasLoadedData && filteredData.length != 0) ? 
                    filteredData.map((value) => (
                    <ListItem key={value.id} sx={{py: "20px", borderBottom: "1px solid black", backgroundColor: cardColour[value.type]}}
                    onClick={() => handleOpenCard(value)} >
                        <SummaryDetails name={value.name} address={value.address ?? ""} halalStatus={value.status.generalHalal} handSlaughtered={value.status.handslaughtered} type={value.type} /> 
                    </ListItem>
                    ))
                : (hasLoadedData && filteredData.length == 0) ?
                <Box sx={{ display: "flex", "flexDirection": "column", alignItems: "center", justifyContent: "center" }}>
                    <Typography variant="h6" sx={{ textAlign: "center", pt: "20px" }}>
                        No food services found.
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: "center", pt: "10px" }}>
                        Please broaden filters or search query.
                    </Typography>
                </Box>
                : 
                <Box sx={{ display: "flex", "flexDirection": "column", alignItems: "center", justifyContent: "center" }}>
                    <Typography variant="h6" sx={{ textAlign: "center", padding: "20px" }}>
                        Loading food services...
                    </Typography>
                    <CircularProgress />
                </Box>
                }
            </List>
            </Paper>

            <DetailCard foodService={cardData?.foodService} active={cardData?.active} onClose={handleCloseCard} />
            
        </Box> 
    );
}
