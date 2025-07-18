import { Box, Chip, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface SummaryDetailsProps {
    name: string;
    address: string;
    halalStatus: string;
    handSlaughtered: string;
}

const halalColourMap: Record<string, string> = {
    "Verified": "#00c629",
    "Confirmed": "#bee1f6",
    "Pending Review": "#e6e6e6", 
    "Partially Halal": "#ffe59f",
    "Potential Issues": "#dd415e", 
}

export function SummaryDetails({name, address, halalStatus, handSlaughtered}: SummaryDetailsProps) {
    const halalColour = halalColourMap[halalStatus]; 
    const handSlaughteredColour = halalColourMap[handSlaughtered]; 

    return (
    <Box sx={{ width: "400px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{flexDirection: "column"}}>
        <Typography variant="h5" component="div"> {name} </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary" flexWrap='wrap'> {address} </Typography>

            <Box sx={{ display: 'flex', flexDirection: "row", gap: 1, mt: 1 }}>
                <Chip label={`${halalStatus} - Halal`} size="small" sx={{ boxShadow: 2, backgroundColor: halalColour, px: 0.5, border: '1px solid red'}} />
                <Chip label={`${handSlaughtered} - HS`} size="small" sx={{ boxShadow: 2, backgroundColor: handSlaughteredColour, px: 0.5, border: '1px solid orange'}} />
            </Box>
        </Box>
        
        <ChevronRightIcon fontSize="large" />
    </Box>
    );
}

export default SummaryDetails;