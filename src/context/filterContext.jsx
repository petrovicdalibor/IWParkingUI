import { createContext, useState } from "react";
import PropTypes from "prop-types";

const FilterContext = createContext({
  searchCondition: "",
  searchCity: "",
  searchZone: "",

  cities: [],
  vehicleTypes: [],
  zones: [],

  // eslint-disable-next-line no-unused-vars
  setSearchCondition: (searchCondition) => {},
  // eslint-disable-next-line no-unused-vars
  setSearchCity: (searchCity) => {},
  // eslint-disable-next-line no-unused-vars
  setSearchZone: (searchZone) => {},

  // eslint-disable-next-line no-unused-vars
  setCities: (cities) => {},
  // eslint-disable-next-line no-unused-vars
  setVehicleTypes: (vehicleTypes) => {},
  // eslint-disable-next-line no-unused-vars
  setZones: (zones) => {},
});

const FilterProvider = ({ children }) => {
  const [searchCondition, setSearchCondition] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchZone, setSearchZone] = useState("");

  const [cities, setCities] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [zones, setZones] = useState([]);

  return (
    <FilterContext.Provider
      value={{
        searchCondition,
        setSearchCondition,
        searchCity,
        setSearchCity,
        searchZone,
        setSearchZone,
        cities,
        setCities,
        vehicleTypes,
        setVehicleTypes,
        zones,
        setZones,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

FilterProvider.propTypes = {
  children: PropTypes.node,
};

export { FilterContext, FilterProvider };
