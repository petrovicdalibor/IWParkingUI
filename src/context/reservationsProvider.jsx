import { createContext, useState } from "react";
import PropTypes from "prop-types";

const ReservationsContext = createContext({
  reservations: [],
  reservationsPage: 1,
  reservationsPages: 1,
  isLoading: true,
  // eslint-disable-next-line no-unused-vars
  setReservations: (reservations) => {},
  // eslint-disable-next-line no-unused-vars
  setReservationsPage: (page) => {},
  // eslint-disable-next-line no-unused-vars
  setReservationsPages: (numPages) => {},
  // eslint-disable-next-line no-unused-vars
  setIsLoading: (isLoading) => {},
});

const ReservationsProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);
  const [reservationsPage, setReservationsPage] = useState(1);
  const [reservationsPages, setReservationsPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ReservationsContext.Provider
      value={{
        reservations,
        reservationsPage,
        reservationsPages,
        isLoading,
        setReservations,
        setReservationsPage,
        setReservationsPages,
        setIsLoading,
      }}
    >
      {children}
    </ReservationsContext.Provider>
  );
};

ReservationsProvider.propTypes = {
  children: PropTypes.node,
};

export { ReservationsContext, ReservationsProvider };
