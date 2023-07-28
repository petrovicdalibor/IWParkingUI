import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
} from "@mui/material";

const SearchGrid = styled(Grid)(({ theme }) => ({
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
  return (
    <form
      autoComplete="off"
      // onSubmit={handleSubmit}
    >
      <SearchGrid container sx={{ width: "100%", padding: "0" }} spacing={1}>
        <Grid item xs={9} md={8} lg={8} xl={8}>
          <TextField
            label="Search"
            // onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            color="secondary"
            type="text"
            // value={email}
            // error={emailError}
            fullWidth
          />
        </Grid>
        <Grid item xs={3} md={4} lg={4} xl={4}>
          <FormControl
            variant="outlined"
            color="secondary"
            fullWidth
            // sx={{ minWidth: 120 }}
          >
            <InputLabel id="demo-simple-select-standard-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              //   value={age}
              //   onChange={handleChange}
              label="City"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </SearchGrid>
    </form>
  );
};

export default SearchInput;
