import Image from "next/image";
import MapView from "../components/mapview/mapview";
import LocationBar from "../components/mapview/locationbar";
import { Box } from "@mui/material";
import MapFilters from "../components/mapview/mapfilters";

export default function Home() {

  // TODO: Offset for headers isnt perfect as header bar tends to slightly change height
  // when the window is resized. Might be due to some feature of MUI styling of app or tool bar

  return (
    <>
      <LocationBar /> 
      <Box sx={{ position: "fixed", top: 120, left: 0, width: "100vw", height: "83vh", 
        overflow: "hidden", backgroundColor: "lightGray", display: "flex", 
        flexDirection:"column", justifyContent: "space-evenly", alignItems: "center"}}>

        <MapFilters />
        <MapView />

      </Box>
    </>
  );
}
