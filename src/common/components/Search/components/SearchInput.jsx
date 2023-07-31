import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
} from "@mui/material";
import { useState } from "react";

const SearchGrid = styled(Grid)(({ theme }) => ({
  padding: "0 !important",
  [theme.breakpoints.down("sm")]: {
    marginTop: "8px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "400px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "400px !important",
    minWidth: "400px !important",
    maxWidth: "400px !important",
  },
}));

const SearchInput = () => {
  const [searchCondition, setSearchCondition] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

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
        <Grid item xs={9} md={8} lg={8} xl={8}>
          <TextField
            label="Search"
            onChange={handleSearchConditionChange}
            variant="filled"
            InputProps={{ disableUnderline: true }}
            type="text"
            value={searchCondition}
            fullWidth
          />
        </Grid>
        <Grid item xs={3} md={4} lg={4} xl={4}>
          <FormControl variant="filled" fullWidth>
            <InputLabel id="city-select-label">City</InputLabel>
            <Select
              labelId="city-select-label"
              id="city-select"
              variant="filled"
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
        </Grid>
      </SearchGrid>
    </>
  );
};

export default SearchInput;
