import { Box, Chip } from "@mui/material";

export enum StatusType {
    General = "Halal", 
    Handslaughtered = "HS"
}

const halalColourMap: Record<string, string> = {
    "Verified": "#00c629",
    "Confirmed": "#bee1f6",
    "Pending Review": "#e6e6e6", 
    "Partially Halal": "#ffe59f",
    "Potential Issues": "#dd415e", 
}

export function StatusChip({status = "Error", type}: {status?: string, type: StatusType}) {


    const chipColour = halalColourMap[status] ||  "#ff008b"; 

    return (
        <Box sx={{ pointerEvents: "none"}}>
        <Chip clickable={false} label={`${status} - ${type.toString()}`} onClick={undefined} size="small" sx={{ boxShadow: 2, backgroundColor: chipColour, px: 0.5, border: '1px solid red'}} />
        </ Box>
    );
}