import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import SummaryDetails from "../summarydetails";

export function SummaryCard() {
    return (
        <>
        <Card elevation={4} sx={{
            position: "absolute", bottom: "5%", borderRadius: "20px" }}>
            <CardContent>
                <SummaryDetails name="Ahmad's Butcher" address="123 Main St, Lakemba" />
            </CardContent>
        </Card>
        </>
    );
}

export default SummaryCard;