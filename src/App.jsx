import { ThemeProvider } from "@emotion/react";

import Theme from "./theme/Theme";

import { AuthProvider } from "./context/authProvider";
import Routes from "./features/ProtectedRoute";
import { ParkingProvider } from "./context/parkingProvider";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <ParkingProvider>
        <ThemeProvider theme={Theme}>
          <div className="toast-container">
            <ToastContainer style={{ zIndex: 100000 }} limit={2} />
          </div>
          <Routes />
        </ThemeProvider>
      </ParkingProvider>
    </AuthProvider>
  );
}

export default App;
