import { ThemeProvider } from "@emotion/react";

import Theme from "./theme/Theme";

import { AuthProvider } from "./context/authProvider";
import Routes from "./features/ProtectedRoute";
import { ParkingProvider } from "./context/parkingProvider";

function App() {
  return (
    <AuthProvider>
      <ParkingProvider>
        <ThemeProvider theme={Theme}>
          <Routes />
        </ThemeProvider>
      </ParkingProvider>
    </AuthProvider>
  );
}

export default App;
