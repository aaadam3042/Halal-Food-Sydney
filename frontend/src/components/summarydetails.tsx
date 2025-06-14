import { Box, Chip, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface SummaryDetailsProps {
    name: string;
    address: string;
}

export function SummaryDetails({name, address}: SummaryDetailsProps) {
    return (
    <Box sx={{ minWidth: "350px", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
        <Box sx={{flexDirection: "column"}}>
        <Typography variant="h5" component="div"> {name} </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary"> {address} </Typography>
        <Chip label="Hand Slaughtered" size="small" sx={{ boxShadow: 2, backgroundColor: "#32CD32"}} />
        </Box>
        
        <ChevronRightIcon fontSize="large" />
    </Box>
    );
}

export default SummaryDetails;