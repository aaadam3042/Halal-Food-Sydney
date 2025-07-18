'use client' // Error boundaries must be Client Components
 
import { Box, Button, Container, Typography } from '@mui/material'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", 
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        zIndex: 1000, textAlign: "center",}}>
      
        <Box sx={{backgroundColor: "white", width: "20rem", rounded: "sm", p: 4, boxShadow: 3, zIndex: 50}}>
            <Typography variant="h4" sx={{marginBottom: 2, color: "#9e0812"}}> 
                Something went critically wrong!
            </Typography>

            <Typography variant="h6" sx={{marginBottom: 2, color: "#9e0812"}}> 
                Try again or contact the admin.
            </Typography>

            <Button onClick={() => reset()} sx={{backgroundColor: "#364152", color: "white", 
                px: 2, py: 1, boxShadow: 2, "&:hover": {backgroundColor: "#9e0812"} 
            }} >
                Try again
            </Button>
        </Box>
    </Box>
    </Container>
  )
}