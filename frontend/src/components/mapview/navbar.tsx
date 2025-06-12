import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import ListAllIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from "next/link";

export function NavBar() {

    // TODO: These use link and are thus prefetching - think about whether this is needed in terms of 
    //  firebase document reads (Are we going to read once after location services are enabled or
    //  location input first and thus we page our results and keep these in memory so we can prefetch
    //  without loading more data from firebase) 

    return (
        <>
        <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0}}>
        <BottomNavigation showLabels > 
          <BottomNavigationAction label="Map" icon={<MapIcon />} LinkComponent={Link} href="/"/>
          <BottomNavigationAction label="List" icon={<ListAllIcon />} LinkComponent={Link} href="/list" />
          <BottomNavigationAction label="Settings" icon={<SettingsIcon />} LinkComponent={Link} href="/settings" />
        </BottomNavigation>
        </Box>
        </>
    );
}

export default NavBar;