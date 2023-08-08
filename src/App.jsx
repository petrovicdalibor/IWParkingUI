import { ThemeProvider } from "@emotion/react";

import Theme from "./theme/Theme";
import { Layout } from "./layouts/Layout";

// import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import routes from "./common/constants/routes.js";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
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
