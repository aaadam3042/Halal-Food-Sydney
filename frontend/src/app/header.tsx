import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

export function Header() {
    return (
        <>
        <Box sx={{ flexGrow: 1}} >
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h5" component="div" padding={2} sx={{ flexGrow: 1 }}>
                Halal Food Sydney
              </Typography>
              <Button> login </Button>
            </Toolbar>
          </AppBar>
        </Box>
        </>
    );
}

export default Header;