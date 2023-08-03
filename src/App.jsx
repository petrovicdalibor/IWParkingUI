import { ThemeProvider } from "@emotion/react";
import { Button, Grid, TextField, Typography } from "@mui/material";

import Theme from "./theme/Theme";
import { Layout } from "./layouts/Layout";
import MyProfile from "./pages/MyProfile";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import routes from './shared/constants/routes.js';

function App() {
  return (
    <ThemeProvider theme={Theme}>
 <Router>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        ))}
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Router>

      <Layout>
        <MyProfile />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
