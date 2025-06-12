import MapView from "../components/mapview/mapview";
import LocationBar from "../components/mapview/locationbar";
import { Box } from "@mui/material";
import MapFilters from "../components/mapview/mapfilters";
import SummaryCard from "@/components/mapview/summarycard";

export default function Home() {

  return (
    <>
      <LocationBar /> 
      <Box sx={{ position: "fixed", top: 124, left: 0, width: "100vw", height: "calc(100vh - 124px - 56px)", 
        overflow: "hidden", backgroundColor: "lightGray", display: "flex", 
        flexDirection:"column", justifyContent: "space-evenly", alignItems: "center"}}>

        <MapFilters />
        <MapView />
        <SummaryCard />

      </Box>
    </>
  );
}
