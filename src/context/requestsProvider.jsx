import { createContext, useState } from "react";
import PropTypes from "prop-types";

const RequestsContext = createContext({
  requests: [],
  requestsPage: 1,
  requestsPages: 1,
  isLoading: true,
  // eslint-disable-next-line no-unused-vars
  setRequests: (requests) => {},
  // eslint-disable-next-line no-unused-vars
  setRequestsPage: (page) => {},
  // eslint-disable-next-line no-unused-vars
  setRequestsPages: (numPages) => {},
  // eslint-disable-next-line no-unused-vars
  setIsLoading: (isLoading) => {},
});

const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [requestsPage, setRequestsPage] = useState(1);
  const [requestsPages, setRequestsPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <RequestsContext.Provider
      value={{
        requests,
        requestsPage,
        requestsPages,
        isLoading,
        setRequests,
        setRequestsPage,
        setRequestsPages,
        setIsLoading,
      }}
    >
      {children}
    </RequestsContext.Provider>
  );
};

RequestsProvider.propTypes = {
  children: PropTypes.node,
};

export { RequestsContext, RequestsProvider };
