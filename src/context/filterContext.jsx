import { createContext, useState } from "react";
import PropTypes from "prop-types";

const FilterContext = createContext({
  cities: [],
  vehicleTypes: [],
  zones: [],
  // eslint-disable-next-line no-unused-vars
  setCities: (cities) => {},
  // eslint-disable-next-line no-unused-vars
  setVehicleTypes: (vehicleTypes) => {},
  // eslint-disable-next-line no-unused-vars
  setZones: (zones) => {},
});

const FilterProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [zones, setZones] = useState([]);

  return (
    <FilterContext.Provider
      value={{
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
