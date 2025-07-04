'use client';

import React from "react";
import DetailCard from "@/components/detailcard";
import LocationFilters from "@/components/locationfilters";
import SearchBar from "@/components/searchbar";
import SummaryDetails from "@/components/summarydetails";
import { Box, List, ListItem, Paper } from "@mui/material";

export default function ListPage() {
    // TODO: Consider if we want to add location bar here 
    const [cardData, setCardData] = React.useState<{
        name: string;
        address: string;
        status: string;
        active: boolean;
    }>({
        name: "",
        address: "",
        status: "",
        active: false,
    });

    const handleOpenCard = (name: string, address: string, status: string) => {
        setCardData({name, address, status, active: true});
    };

    const handCloseCard = () => {
        setCardData((prev) => ({ ...prev, active: false}));
    };

    return (
        <Box sx={{ position: "fixed", top: 64, left: 0, width: "100vw", height: "calc(100vh - 64px - 56px)", 
        overflow: "hidden", display: "flex", flexDirection:"column", justifyContent: "space-evenly", 
        alignItems: "center", backgroundImage: "url(/geometric-background.png)",
        backgroundSize: "30%", backgroundPosition: "center", backgroundRepeat: "repeat"}}>

            <LocationFilters />

            <SearchBar />

            <Paper elevation={3} sx={{ borderRadius: "10px", zIndex:1}}>
            <List sx={{ height: "70vh", overflow: "auto", minWidth: "25rem", bgcolor: "background.paper", color: "black", margin: "5px" }}>
                {[1,2,3,4,5,6,7,8,9].map((value) => (
                    <ListItem key={value} sx={{py: "10px"}}
                    onClick={() => handleOpenCard(`Butcher ${value}`, `${value} Main St, Lakemba`, "Halal")} >
                        <SummaryDetails name={`Butcher ${value}`} address={`${value} Main St, Lakemba`} />
                    </ListItem>
                ))}
            </List>
            </Paper>

            <DetailCard name={cardData.name} address={cardData.address} status={cardData.status} active={cardData.active} onClose={handCloseCard} />
            
        </Box> 
    );
}
