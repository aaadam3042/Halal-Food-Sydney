import MapView from "../components/mapview/mapview";
import LocationBar from "../components/mapview/locationbar";
import { Box } from "@mui/material";
import LocationFilters from "../components/locationfilters";
import SummaryCard from "@/components/mapview/summarycard";

export default function Home() {

  return (
    <>
      <LocationBar /> 
      <Box sx={{ position: "fixed", top: 124, left: 0, width: "100vw", height: "calc(100vh - 124px - 56px)", 
        overflow: "hidden", display: "flex", flexDirection:"column", justifyContent: "space-evenly", 
        alignItems: "center", backgroundImage: "url(/geometric-background.png)",
        backgroundSize: "30%", backgroundPosition: "center", backgroundRepeat: "repeat"}}>

        <LocationFilters />
        <MapView />
        <SummaryCard />

      </Box>
    </>
  );
}
