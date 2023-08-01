import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

const SearchGrid = styled(Grid)(({ theme }) => ({
  padding: "0 !important",
  [theme.breakpoints.down("sm")]: {
    marginTop: "8px",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "8px",
  },
  [theme.breakpoints.only("sm")]: {
    width: "394px",
  },
  [theme.breakpoints.up("md")]: {
    width: "400px !important",
    minWidth: "400px !important",
    maxWidth: "400px !important",
  },
}));

const SearchGridItem = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    paddingTop: "0 !important",
  },
}));

const SearchInput = () => {
  const [searchCondition, setSearchCondition] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  const handleSelectChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleSearchConditionChange = (e) => {
    setSearchCondition(e.target.value);
  };

  return (
    <>
      <SearchGrid
        container
        sx={{ width: "100%", paddingRight: "10px !important", marginLeft: 0 }}
        spacing={1}
      >
        <SearchGridItem item xs={8}>
          <TextField
            label="Search"
            onChange={handleSearchConditionChange}
            variant="filled"
            size={isXs ? "small" : "normal"}
            InputProps={{ disableUnderline: true }}
            type="text"
            value={searchCondition}
            fullWidth
          />
        </SearchGridItem>
        <SearchGridItem item xs={4}>
          <FormControl
            variant="filled"
            size={isXs ? "small" : "normal"}
            fullWidth
          >
            <InputLabel id="city-select-label">City</InputLabel>
            <Select
              labelId="city-select-label"
              id="city-select"
              variant="filled"
              size={isXs ? "small" : "normal"}
              disableUnderline={true}
              value={selectedCity}
              onChange={handleSelectChange}
              label="City"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value={10}>Skopje</MenuItem>
              <MenuItem value={20}>Bitola</MenuItem>
              <MenuItem value={30}>Prilep</MenuItem>
            </Select>
          </FormControl>
        </SearchGridItem>
      </SearchGrid>
    </>
  );
};

export default SearchInput;
