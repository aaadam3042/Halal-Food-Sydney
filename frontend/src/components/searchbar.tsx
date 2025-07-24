import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent } from "react";

export function SearchBar({ searchQuery, onSearchChange } : { searchQuery: string, onSearchChange: (event: ChangeEvent<HTMLInputElement>)=>void }) {
    return (
        <Paper elevation={3}
        sx={{ width: "30ch", borderRadius: "5px", backgroundColor: "gray",
            display: 'flex', gap: 2, justifyContent: "start", alignItems: "center", pl: 2, py: 0.2
        }}>
            <SearchIcon fontSize="medium" sx={{color: "white"}} />
            <InputBase placeholder="Search..." sx={{color: "lightgray"}} value={searchQuery} onChange={onSearchChange} />
        </Paper>
    );
}

export default SearchBar;