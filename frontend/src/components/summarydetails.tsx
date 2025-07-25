import { Box, Chip, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { StatusChip, StatusType } from "./statuschip";

interface SummaryDetailsProps {
    name: string;
    address: string;
    halalStatus: string;
    handSlaughtered: string;
    type: string;
}

const halalColourMap: Record<string, string> = {
    "Verified": "#00c629",
    "Confirmed": "#bee1f6",
    "Pending Review": "#e6e6e6", 
    "Partially Halal": "#ffe59f",
    "Potential Issues": "#dd415e", 
}

export function SummaryDetails({name, address, halalStatus, handSlaughtered, type}: SummaryDetailsProps) {
    return (
    <Box sx={{ width: "400px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{flexDirection: "column"}}>

            <Typography variant="h5" component="div" sx={{ display: "inline", mr: 1 }}>
                {name}
                
                <Typography component="span" sx={{ fontSize: 12, color: "text.secondary", ml: 1, justifySelf: "center" }}>
                    ({type})
                </Typography>
                
            </Typography>
            
            <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary" flexWrap='wrap'> {address} </Typography>

            <Box sx={{ display: 'flex', flexDirection: "row", gap: 1, mt: 1 }}>
                <StatusChip status={halalStatus} type={StatusType.General} />
                <StatusChip status={handSlaughtered} type={StatusType.Handslaughtered} />
            </Box>
        </Box>
        
        <ChevronRightIcon fontSize="large" />
    </Box>
    );
}

export default SummaryDetails;