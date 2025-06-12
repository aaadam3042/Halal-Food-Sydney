import Image from "next/image";
import MapView from "./mapview";
import LocationBar from "./locationbar";
import { Box } from "@mui/material";

export default function Home() {

  // TODO: Offset for headers isnt perfect as header bar tends to slightly change height
  // when the window is resized. Might be due to some feature of MUI styling of app or tool bar

  return (
    <>
      <LocationBar /> 
      <Box sx={{ position: "fixed", top: 100, left: 0, width: "100vw", height: "85vh", 
        overflow: "hidden", backgroundColor: "lightGray", display: "flex", 
        flexDirection:"column", justifyContent: "start", alignItems: "center"}}>

        <MapView />
        
      </Box>
    </>
  );
}
