import { createContext, useState } from "react";
import PropTypes from "prop-types";

const ParkingContext = createContext({
  parkingLots: [],
  // eslint-disable-next-line no-unused-vars
  setParkingLots: (parkingLot) => {},
});

const ParkingProvider = ({ children }) => {
  const [parkingLots, setParkingLots] = useState([]);

  return (
    <ParkingContext.Provider
      value={{
        parkingLots,
        setParkingLots,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};

ParkingProvider.propTypes = {
  children: PropTypes.node,
};

export { ParkingContext, ParkingProvider };
