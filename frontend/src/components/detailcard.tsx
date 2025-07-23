import React from "react";
import { Box, Button, Card, ClickAwayListener, Divider, IconButton, Link, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MapIcon from "@mui/icons-material/Map";
import { FoodService } from "@/types/foodService";
import { StatusChip, StatusType } from "./statuschip";
import { useError } from "@/contexts/errorContext";

interface DetailCardProps {
    foodService: FoodService | undefined;
    active: Boolean | undefined;
    onClose: () => void;
}

export const cardColour = {
    "Butcher": "#fbffe9",
    "Restaurant": "#e0f7fa",
}

export function DetailCard({foodService, active, onClose}: DetailCardProps) {
    
    const { showError } = useError();
    const [showHistory, setShowHistory] = React.useState(false)
    
    if (!active) return null;
    if (!foodService) {
        console.error("DetailCard: foodService is undefined");
        return null;
    }

    const cardTypeSymbol = foodService.type == "Restaurant" ? "🍔" : (foodService.type == "Butcher") ?  "🥩" : "⚠️"

    const hasHistory = (foodService.statusHistory.length == 0 || foodService.statusHistory == undefined) ? false : true

    const statusHistoryCard = <>{
        hasHistory && showHistory ? <>
        
        <Card sx={{position: "fixed", zIndex: 3, bgcolor: "white", width: "100vw", height: "85vh",
            overflowY: "auto", overflowX:"hidden"
        }}>
            <Box display='flex' flexDirection='column'  marginX={5}>
                <Box display='flex' flexDirection='row' justifyContent='start' my={2}>
                    <Typography variant="h5"> Halal Status History </Typography>
                </Box>
                <IconButton onClick={() => {setShowHistory(false)}} sx={{position: "absolute", top: 8, right: 30}}>
                    <CloseIcon fontSize='large' />
                </IconButton>

                <Divider />

                <Box my={2}>
                {foodService.statusHistory.map((value, idx) => (                    
                    <Box my={2} display="flex" flexDirection="row" justifyContent="start" key={idx}> 
                    <Typography variant="body1" fontWeight="bold" mr={1}> {value.date} - </Typography>
                    <StatusChip type={(value.status.split(" - ")[1] == "Handslaughtered") ? StatusType.Handslaughtered : StatusType.General} status={value.status.split(" - ")[0]} />
                    </Box>
                )).reverse()}
                </Box>

            </Box>
        </Card>
        </> : <></>
    }</>

    return(
        <ClickAwayListener onClickAway={()=>{ setShowHistory(false); onClose(); }}>
        <Box display="contents">
        { statusHistoryCard }
        <Card sx={{ 
            position: "fixed",
            bottom: "25vh",    // This centers the card vertically. It is 50vh from the bottom minus half the height of the card
            height: "50vh", // TODO: Fix this cos a phone would be shaped weird
            width: "50vw",
            borderRadius: "10px",
            zIndex: 2,
            backgroundColor: cardColour[foodService.type],
            overflowY: "auto",
            overflowX: "hidden",
        }}>
            <Box display='flex' flexDirection='column'  marginX={5} my={2}>
                <Box display='flex' flexDirection='row' justifyContent='space-between'>

                    <Box display='flex' flexDirection='row' gap={1} alignItems='center' mr={1.5}>
                        <Typography variant="h4" sx={{ mr:2 }}> {cardTypeSymbol} </Typography>
                        <Box>
                            <Typography variant="h5"> {foodService?.name} </Typography>
                            <Typography> {foodService?.address} </Typography> 
                        </Box>
                    </Box>

                    <Box display="flex" flexWrap="nowrap" alignItems="center">
                        <IconButton sx={{ backgroundColor: "ButtonHighlight", boxShadow: 1, mx:1, p:1.5 }} onClick={()=>{
                            // Open Google Maps with the geolocation if available or address
                            if (foodService.geolocation) {
                                const { latitude, longitude } = foodService.geolocation;
                                window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, "_blank");
                            } else if (foodService.address) {
                                window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(foodService.address)}`, "_blank");
                            } else {
                                showError("No location or address available for this food service.");
                            }
                        }}>
                            <MapIcon fontSize="medium" />
                        </IconButton>

                        <IconButton onClick={onClose} >
                            <CloseIcon fontSize='large' />
                        </IconButton>
                    </Box>
                </Box>

                
                <Divider sx={{ marginY: 2 }} />

                <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mt={1} >

                    <Box sx={{ display: 'flex', flexDirection: "row", gap: 1 }}>
                        <StatusChip status={foodService?.status.generalHalal} type={StatusType.General} />
                        <StatusChip status={foodService?.status.handslaughtered} type={StatusType.Handslaughtered} />
                    </Box>

                    <Button variant="contained" size="small" disabled={!hasHistory} onClick={() => {setShowHistory(true)}}> View Halal History </Button>
                </Box>

                <Divider sx={{ mt: 3 }} />

                { foodService.notes.trim() !== "" ? 
                    <>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginTop: 1 }}> Notes: </Typography>
                    <Typography variant="body1" sx={{ marginTop: 1, whiteSpace: "pre-line" }}>
                        {foodService.notes}
                    </Typography>
                    <Divider sx={{ my: 3 }} />
                    </> 
                    : 
                    <></>
                }
                                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    { (foodService.contact?.email || foodService.contact?.phone || foodService.contact?.website) &&
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}> Contact Details: </Typography>
                    }
                    {foodService.contact?.phone && <Typography> Phone: {foodService.contact.phone} </Typography>}
                    {foodService.contact?.email && <Typography> Email: <Link 
                        href={`mailto:${foodService.contact.email}?subject=Halal\ Enquiry`}> {foodService.contact.email} </Link> </Typography>}
                    {foodService.contact?.website && <Typography> Website: <Link target="_blank" rel="noreferrer" 
                        href={`https://${foodService.contact.website}`}> {foodService.contact.website} </Link> </Typography>}
                </Box>

            </Box>

        </Card>
        </Box>
        </ClickAwayListener>
    );
}

export default DetailCard;