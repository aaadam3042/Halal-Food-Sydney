import { Box, Paper, Typography } from "@mui/material";

export default function AdminPage() {
    return (
    <Box sx={{ position: "fixed", top: 64, left: 0, width: "100vw", height: "calc(100vh - 64px - 56px)", 
        overflow: "hidden", display: "flex", flexDirection:"column", justifyContent: "space-evenly", 
        alignItems: "center", backgroundImage: "url(/geometric-background.png)",
        backgroundSize: "30%", backgroundPosition: "center", backgroundRepeat: "repeat"}}>

        <Paper elevation={3} sx={{ width: "80%", height: "80%", display: "flex", padding: 4,
            flexDirection: "column", justifyContent: "start", alignItems: "center",}}>
                <Typography variant="h4" sx={{ marginBottom: 2 }}>
                    Admin Dashboard
                </Typography>
                <Box sx={{ alignSelf: "start"}}>
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>
                        Add Requests
                    </Typography>
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>
                        Edit Requests
                    </Typography>
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>
                        Flags
                    </Typography>
                </Box>
        </Paper>
    </Box>
    );
}