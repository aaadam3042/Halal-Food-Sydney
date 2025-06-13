import { Box } from "@mui/material";

export function ListPage() {
    return (
        <Box sx={{ position: "fixed", top: 64, left: 0, width: "100vw", height: "calc(100vh - 64px - 56px)", 
        overflow: "hidden", backgroundColor: "lightGray", display: "flex", 
        flexDirection:"column", justifyContent: "space-evenly", alignItems: "center"}}>
            
        </Box>
    );
}

export default ListPage;