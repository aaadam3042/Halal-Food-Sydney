import LocationFilters from "@/components/locationfilters";
import SummaryDetails from "@/components/summarydetails";
import { Box, Divider, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

export function ListPage() {
    // TODO: Consider if we want to keep location bar here 

    return (
        <Box sx={{ position: "fixed", top: 64, left: 0, width: "100vw", height: "calc(100vh - 64px - 56px)", 
        overflow: "hidden", display: "flex", flexDirection:"column", justifyContent: "space-evenly", 
        alignItems: "center", backgroundImage: "url(/geometric-background.png)",
        backgroundSize: "30%", backgroundPosition: "center", backgroundRepeat: "repeat"}}>

            <LocationFilters />

            <Paper elevation={3} sx={{ borderRadius: "10px"}}>
            <List sx={{ height: "70vh", overflow: "auto", minWidth: "25rem", bgcolor: "background.paper", color: "black", margin: "5px" }}>
                {[1,2,3,4,5,6,7,8,9].map((value) => (
                    <ListItem key={value} sx={{py: "10px"}}>
                        <SummaryDetails name={`Butcher ${value}`} address={`${value} Main St, Lakemba`} />
                    </ListItem>
                ))}
            </List>
            </Paper>
            
        </Box> 
    );
}

export default ListPage;