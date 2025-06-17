import { Box, Card, Typography } from "@mui/material";

export default function SettingsPage() {
    return (
    <Box sx={{ position: "fixed", top: 64, left: 0, width: "100vw", height: "calc(100vh - 64px - 56px)", 
        overflow: "hidden", display: "flex", flexDirection:"column", justifyContent: "space-evenly", 
        alignItems: "center", backgroundImage: "url(/geometric-background.png)",
        backgroundSize: "30%", backgroundPosition: "center", backgroundRepeat: "repeat"}}>
        
        <Card sx={{ width: "80%", height: "80%", display: "flex", flexDirection: "column", 
            justifyContent: "center", alignItems: "center", padding: 2, borderRadius: 5,
            boxShadow: 4}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Settings
            </Typography>
            <Typography variant="body1" component="p">
                No settings available yet.
            </Typography>
        </Card>

    </Box>
    );
}
