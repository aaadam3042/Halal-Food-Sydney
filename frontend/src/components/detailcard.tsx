import React from "react";
import { Box, Card, ClickAwayListener, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FoodService } from "@/types/foodService";
import { StatusChip, StatusType } from "./statuschip";

interface DetailCardProps {
    foodService: FoodService | undefined;
    active: Boolean | undefined;
    onClose: () => void;
}

export function DetailCard({foodService, active, onClose}: DetailCardProps) {

    if (!active) return null;

    return(
        <ClickAwayListener onClickAway={onClose}>
        <Card sx={{ 
            position: "fixed",
            bottom: "25vh",    // This centers the card vertically. It is 50vh from the bottom minus half the height of the card
            height: "50vh", // TODO: Fix this cos a phone would be shaped weird
            width: "50vw",
            borderRadius: "10px",
            zIndex: 2
        }}>
            <Box display='flex' flexDirection='column'  marginX={5} marginTop={2}>
                <Box display='flex' flexDirection='row' justifyContent='space-between'>
                    <Typography variant="h5"> {foodService?.name} </Typography>
                    <IconButton onClick={onClose} >
                        <CloseIcon fontSize='large' />
                    </IconButton>
                </Box>

                <Typography> {foodService?.address} </Typography>
                <Box sx={{ display: 'flex', flexDirection: "row", gap: 1, mt: 1 }}>
                <StatusChip status={foodService?.status.generalHalal || "undefined"} type={StatusType.General} />
                <StatusChip status={foodService?.status.handslaughtered || "undefined"} type={StatusType.Handslaughtered} />
                </Box>

            </Box>

        </Card>
        </ClickAwayListener>
    );
}

export default DetailCard;