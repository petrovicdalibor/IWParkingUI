import { createContext, useState } from "react";
import PropTypes from "prop-types";

const ParkingContext = createContext({
  parkingLots: [],
  isLoading: true,
  pageNumber: 0,
  numPages: 0,

  // eslint-disable-next-line no-unused-vars
  setParkingLots: (parkingLot) => {},
  // eslint-disable-next-line no-unused-vars
  setIsLoading: (loading) => {},
  // eslint-disable-next-line no-unused-vars
  setPageNumber: (pageNumber) => {},
  // eslint-disable-next-line no-unused-vars
  setNumPages: (numPages) => {},
});

const ParkingProvider = ({ children }) => {
  const [parkingLots, setParkingLots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [numPages, setNumPages] = useState(0);

  return (
    <ParkingContext.Provider
      value={{
        parkingLots,
        isLoading,
        pageNumber,
        numPages,
        setParkingLots,
        setIsLoading,
        setPageNumber,
        setNumPages,
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
