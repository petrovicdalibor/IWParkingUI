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
import { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../../../context/filterContext";
import useParkingLots from "../../../hooks/useParkingLots";
import useDebounce from "../../../hooks/useDebounce";
import { ParkingContext } from "../../../../context/parkingProvider";

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
    paddingRight: "10px !important",
  },
  [theme.breakpoints.up("md")]: {
    width: "560px !important",
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
  const [selectedZone, setSelectedZone] = useState("");

  const filterContext = useContext(FilterContext);
  const parkingContext = useContext(ParkingContext);

  const { fetchParkingLots } = useParkingLots();

  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  const searchQuery = useDebounce(searchCondition, 750);

  const handleCitySelect = (e) => {
    setSelectedCity(e.target.value);
    filterContext.setSearchCity(e.target.value);
    parkingContext.setPageNumber(0);

    fetchParkingLots({
      page: 0,
      city: e.target.value,
      name: filterContext.searchCondition,
      zone: filterContext.searchZone,
    });
  };
  const handleZoneSelect = (e) => {
    setSelectedZone(e.target.value);
    filterContext.setSearchZone(e.target.value);
    parkingContext.setPageNumber(0);

    fetchParkingLots({
      page: 0,
      city: filterContext.searchCity,
      name: filterContext.searchCondition,
      zone: e.target.value,
    });
  };

  useEffect(() => {
    fetchParkingLots({
      page: 0,
      city: filterContext.searchCity,
      name: searchQuery,
      zone: filterContext.searchZone,
    });
  }, [searchQuery]);

  return (
    <>
      <SearchGrid
        container
        sx={{ width: "100%", marginLeft: 0 }}
        direction={isXs ? "column" : "row"}
      >
        <SearchGridItem item xs={6} sm={6} sx={{ paddingLeft: "0 !important" }}>
          <TextField
            label="Search"
            onChange={(e) => {
              setSearchCondition(e.target.value);
              // handleSearchConditionChange(e.target.value);
            }}
            variant="filled"
            size={isXs ? "small" : "normal"}
            InputProps={{ disableUnderline: true }}
            type="text"
            value={searchCondition}
            fullWidth
          />
        </SearchGridItem>
        <Grid item xs={6} sm={6} display={"flex"} mt={isXs ? 1 : 0}>
          <SearchGridItem item xs={4} sm={6} pl={isXs ? 0 : 1}>
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
                onChange={handleCitySelect}
                label="City"
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {filterContext.cities.map((city) => (
                  <MenuItem value={city.name} key={city.id}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </SearchGridItem>
          <SearchGridItem item xs={4} sm={6} pl={1}>
            <FormControl
              variant="filled"
              size={isXs ? "small" : "normal"}
              fullWidth
            >
              <InputLabel id="city-select-label">Zone</InputLabel>
              <Select
                labelId="city-select-label"
                id="city-select"
                variant="filled"
                size={isXs ? "small" : "normal"}
                disableUnderline={true}
                value={selectedZone}
                onChange={handleZoneSelect}
                label="City"
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {filterContext.zones.map((zone) => (
                  <MenuItem value={zone.name} key={zone.id}>
                    {zone.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </SearchGridItem>
        </Grid>
      </SearchGrid>
    </>
  );
};

export default SearchInput;
