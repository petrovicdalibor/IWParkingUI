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

  const handleSelectChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <form
      autoComplete="off"
      // onSubmit={handleSubmit}
    >
      <SearchGrid
        container
        sx={{ width: "100%", paddingRight: "10px !important", marginLeft: 0 }}
        spacing={1}
      >
        <Grid item xs={9} md={8} lg={8} xl={8}>
          <TextField
            label="Search"
            onChange={(e) => setSearchCondition(e.target.value)}
            variant="filled"
            InputProps={{ disableUnderline: true }}
            type="text"
            value={searchCondition}
            fullWidth
          />
        </Grid>
        <Grid item xs={3} md={4} lg={4} xl={4}>
          <FormControl variant="filled" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              variant="filled"
              disableUnderline={true}
              value={selectedCity}
              onChange={handleSelectChange}
              label="City"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"10"}>Ten</MenuItem>
              <MenuItem value={"20"}>Twenty</MenuItem>
              <MenuItem value={"30"}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </SearchGrid>
    </form>
  );
};

export default SearchInput;
