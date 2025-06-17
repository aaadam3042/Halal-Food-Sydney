import { AdminPanelSettings, Notifications } from '@mui/icons-material';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import SettingsIcon from '@mui/icons-material/Settings';

export function Header() {
    return (
        <AppBar position="fixed" >
          <Toolbar>
            <Typography variant="h5" component="div" padding={2} sx={{ flexGrow: 1 }}>
              Halal Food Sydney
            </Typography>
            
            { /* TODO: There should be client side logic here to hide the correct features
            when logged in vs not. Make login a fullscreen popup and 
            notifications a small popup from icon */ }
            <Button color='inherit'> Admin Login </Button>

            <IconButton size="large" edge="end" color="inherit" aria-label="account">
              <Notifications />
            </IconButton>
            <IconButton size="large" edge="end" color="inherit" aria-label="login" LinkComponent={Link} href="/admin">
              <AdminPanelSettings />
            </IconButton>

            <IconButton size="large" edge="end" color="inherit" aria-label="settings" LinkComponent={Link} href="/settings">
              <SettingsIcon />
            </IconButton>

          </Toolbar>
        </AppBar>
    );
}

export default Header;