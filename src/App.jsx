import { ThemeProvider } from "@emotion/react";

import Theme from "./theme/Theme";

import { AuthProvider } from "./context/authProvider";
import Routes from "./features/ProtectedRoute";
import { ParkingProvider } from "./context/parkingProvider";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <div className="toast-container">
        <ToastContainer limit={2} />
      </div>
      <ParkingProvider>
        <ThemeProvider theme={Theme}>
          <Routes />
        </ThemeProvider>
      </ParkingProvider>
    </AuthProvider>
  );
}

export default App;
