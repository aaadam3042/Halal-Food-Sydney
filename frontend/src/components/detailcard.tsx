import React from "react";
import { Box, Card, ClickAwayListener, Divider, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FoodService } from "@/types/foodService";
import { StatusChip, StatusType } from "./statuschip";

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

    if (!active) return null;

    if (!foodService) {
        console.error("DetailCard: foodService is undefined");
        return null;
    }

    const cardTypeSymbol = foodService.type == "Restaurant" ? "🍔" : (foodService.type == "Butcher") ?  "🥩" : "⚠️"

    return(
        <ClickAwayListener onClickAway={onClose}>
        <Card sx={{ 
            position: "fixed",
            bottom: "25vh",    // This centers the card vertically. It is 50vh from the bottom minus half the height of the card
            height: "50vh", // TODO: Fix this cos a phone would be shaped weird
            width: "50vw",
            borderRadius: "10px",
            zIndex: 2,
            backgroundColor: cardColour[foodService.type]
        }}>

            {/* TODO: Add rest of data */}
            <Box display='flex' flexDirection='column'  marginX={5} marginTop={2}>
                <Box display='flex' flexDirection='row' justifyContent='space-between'>
                    <Box display='flex' flexDirection='row' gap={1} alignItems='center'>
                    <Typography variant="h5"> {foodService?.name} </Typography>
                    <Typography variant="h4"> {cardTypeSymbol} </Typography>
                    </Box>
                    <IconButton onClick={onClose} >
                        <CloseIcon fontSize='large' />
                    </IconButton>
                </Box>

                <Typography> {foodService?.address} </Typography>
                <Divider sx={{ marginY: 1 }} />

                <Box sx={{ display: 'flex', flexDirection: "row", gap: 1, mt: 1 }}>
                <StatusChip status={foodService?.status.generalHalal} type={StatusType.General} />
                <StatusChip status={foodService?.status.handslaughtered} type={StatusType.Handslaughtered} />
                </Box>

            </Box>

        </Card>
        </ClickAwayListener>
    );
}

export default DetailCard;