import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";

export function SummaryCard() {
    return (
        <>
        <Card elevation={4} sx={{
            position: "absolute", bottom: "5%", borderRadius: "20px" }}>
            <CardContent>
                <Box sx={{ minWidth: "350px", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                    <Box sx={{flexDirection: "column"}}>
                    <Typography variant="h5" component="div"> Ahmad's Butcher </Typography>
                    <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary"> 123 Main St, Lakemba </Typography>
                    <Chip label="Hand Slaughtered" size="small" sx={{ boxShadow: 2, backgroundColor: "#32CD32"}} />
                    </Box>

                    <ChevronRightIcon fontSize="large" />
                </Box>
            </CardContent>
        </Card>
        </>
    );
}

export default SummaryCard;