"use client";

import { useError } from "@/contexts/errorContext";
import { Box, Button, ClickAwayListener, Typography } from "@mui/material";

function ErrorPane() {
  const { error, clearError } = useError();

  if (!error) {
    return null;
  }

  return (
    <ClickAwayListener onClickAway={clearError}>
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", 
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        zIndex: 1000, textAlign: "center",}}>
      
        <Box sx={{backgroundColor: "white", width: "20rem", rounded: "sm", p: 4, boxShadow: 3, zIndex: 50}}>
            <Typography variant="h6" sx={{marginBottom: 2, color: "#9e0812"}}> 
                { error }
            </Typography>

            <Button onClick={clearError} sx={{backgroundColor: "#364152", color: "white", 
                px: 2, py: 1, boxShadow: 2, "&:hover": {backgroundColor: "#9e0812"} 
            }} >
                Close
            </Button>
        </Box>
    </Box>
    </ClickAwayListener>
  );
}

export default ErrorPane;