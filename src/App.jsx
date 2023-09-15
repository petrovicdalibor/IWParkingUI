import { ThemeProvider } from "@emotion/react";

import Theme from "./theme/Theme";

import { AuthProvider } from "./context/authProvider";
import Routes from "./features/ProtectedRoute";
import { ParkingProvider } from "./context/parkingProvider";
import { ToastContainer } from "react-toastify";
import { FilterProvider } from "./context/filterContext";
import { RequestsProvider } from "./context/requestsProvider";
import { ReservationsProvider } from "./context/reservationsProvider";

function App() {
  return (
    <AuthProvider>
      <ParkingProvider>
        <RequestsProvider>
          <FilterProvider>
            <ReservationsProvider>
              <ThemeProvider theme={Theme}>
                <div className="toast-container">
                  <ToastContainer style={{ zIndex: 100000 }} limit={2} />
                </div>
                <Routes />
              </ThemeProvider>
            </ReservationsProvider>
          </FilterProvider>
        </RequestsProvider>
      </ParkingProvider>
    </AuthProvider>
  );
}

export default App;
