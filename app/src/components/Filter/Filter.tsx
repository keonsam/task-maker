import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useEffect, useState } from "react";
import { Pagination, Sort, Timeline } from "../../types/Pagination";

type FilterProps = {
  onPage: (page: Pagination) => void;
  sort?: Sort;
  prevSearch: string | undefined;
  preTimeline: string | undefined;
};

export default function Filter({
  onPage,
  sort,
  prevSearch,
  preTimeline,
}: FilterProps) {
  const [search, setSearch] = useState("");

  const handleTimeline = (timeline: Timeline) => {
    if (timeline !== preTimeline) {
      onPage({
        timeline,
      });
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search !== prevSearch) {
        onPage({ search });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, prevSearch, onPage]);

  const isDesc = sort === "DESC";

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
      {/* filters  */}
      <Box sx={{ display: "flex" }}>
        <IconButton
          onClick={() => onPage({ sort: isDesc ? "ASC" : "DESC" })}
          size="large"
          aria-label="sort"
        >
          <SwapVertIcon color={isDesc ? "primary" : "inherit"} />
        </IconButton>

        <TextField
          id="due-date"
          select
          defaultValue="incoming"
          variant="standard"
          label="Due Date"
          size="medium"
          sx={{
            width: { xs: "11ch", sm: "15ch" },
            ml: { xs: 1, sm: 4 },
          }}
          onChange={(e) => handleTimeline(e.target.value as Timeline)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="incoming">Incoming</MenuItem>
          <MenuItem value="past">Past</MenuItem>
        </TextField>
      </Box>

      {/* search  */}
      <TextField
        id="Search"
        label="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder="Enter Search fields..."
        variant="standard"
        sx={{
          width: { xs: "20ch", sm: "50ch" },
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Box>
  );
}
