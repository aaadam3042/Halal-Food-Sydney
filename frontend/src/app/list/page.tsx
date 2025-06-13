import { Box, List, ListItem, ListItemText } from "@mui/material";

export function ListPage() {
    // TODO: Consider if we want to keep location bar here 

    return (
        <Box sx={{ position: "fixed", top: 64, left: 0, width: "100vw", height: "calc(100vh - 64px - 56px)", 
        overflow: "hidden", display: "flex", flexDirection:"column", justifyContent: "space-evenly", 
        alignItems: "center", backgroundImage: "url(/geometric-background.png)",
        backgroundSize: "30%", backgroundPosition: "center", backgroundRepeat: "repeat"}}>
            <List sx={{ witdh: "100%", maxWidth: 360, bgcolor: "background.paper", color: "black" }}>
                {[1,2,3].map((value) => (
                    <ListItem key={value}>
                        <ListItemText primary={`Restaurant ${value}`} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default ListPage;