import { createContext, useState } from "react";
import PropTypes from "prop-types";

const ParkingContext = createContext({
  parkingLots: [],
  pageNumber: 0,
  // eslint-disable-next-line no-unused-vars
  setParkingLots: (parkingLot) => {},
  // eslint-disable-next-line no-unused-vars
  setPageNumber: (pageNumber) => {},
});

const ParkingProvider = ({ children }) => {
  const [parkingLots, setParkingLots] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  return (
    <ParkingContext.Provider
      value={{
        parkingLots,
        pageNumber,
        setParkingLots,
        setPageNumber,
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
