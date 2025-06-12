import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationIcon from '@mui/icons-material/NearMe';

export function LocationBar() {

    return (
        <>
        <AppBar sx={{top: 60, left: 0, right: 0, width: '100%', backgroundColor: "brown"}}>
            <Toolbar>
            <Box paddingX={1} paddingY={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }} margin={0} padding={0} > 
                    Lakemba, NSW
                </Typography>
                <Box>
                <SearchIcon sx ={{fontsize: 28, marginRight: 2}} />
                <LocationIcon sx ={{fontsize: 28, marginRight: 2}} />
                </Box>
            </Box>
            </Toolbar>
        </AppBar>
        </>
    );
}

export default LocationBar;