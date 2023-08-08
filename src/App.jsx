import { ThemeProvider } from "@emotion/react";

import Theme from "./theme/Theme";

import { AuthProvider } from "./context/authProvider";
import Routes from "./features/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={Theme}>
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
