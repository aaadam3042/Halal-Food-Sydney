import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationIcon from '@mui/icons-material/NearMe';

export function LocationBar() {

    // TODO: Make search button open a search modal
    // TODO: Make location button request location or update it

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#4A4238', top: 60}}>
            <Toolbar>
            <Box paddingX={1} paddingY={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant="h5"> ‎  </Typography> {/* Workaround for weird MUI appbar resizing */}
                <Typography component="div" sx={{ flexGrow: 1, textAlign: 'left'}}> 
                    Lakemba, NSW
                </Typography>
                <Box>
                <IconButton sx={{ color: 'white', padding: 0}} aria-label="search">
                    <SearchIcon sx ={{fontsize: 28, marginRight: 2}} />
                </IconButton>

                <IconButton sx={{ color: 'white', padding: 0}} aria-label="location">
                    <LocationIcon sx ={{fontsize: 28, marginRight: 2}} />
                </IconButton>
                </Box>
            </Box>
            </Toolbar>
        </AppBar>
    );
}

export default LocationBar;