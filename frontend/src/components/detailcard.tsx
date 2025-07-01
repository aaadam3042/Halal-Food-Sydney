'use client';

import React from "react";
import { Box, Card, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DetailCardProps {
    name: string;
    address: string;
    status: string;
    active: Boolean;
}

export function DetailCard({name, address, status, active}: DetailCardProps) {
    
    const [visible, setVisible] = React.useState(active);

    return(
        <Card sx={{ 
            visibility: visible ? 'visible' : 'hidden',
            position: "fixed",
            bottom: "25vh",    // This centers the card vertically. It is 50vh from the bottom minus half the height of the card
            height: "50vh", // TODO: Fix this cos a phone would be shaped weird
            width: "50vw",
            borderRadius: "10px",
            zIndex: 2
        }}>
            <Box display='flex' flexDirection='column'  marginX={5} marginTop={2}>
                <Box display='flex' flexDirection='row' justifyContent='space-between'>
                    <Typography variant="h5"> {name} </Typography>
                    <IconButton onClick={() => setVisible(false)} >
                        <CloseIcon fontSize='large' />
                    </IconButton>
                </Box>

                <Typography> {address} </Typography>
            </Box>

        </Card>
    );
}

export default DetailCard;