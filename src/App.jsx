import { ThemeProvider } from "@emotion/react";
import { Button, Grid, TextField, Typography } from "@mui/material";

import Theme from "./theme/Theme";
import { Layout } from "./layouts/Layout";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import routes from "./shared/constants/routes.js";
import Login from "./features/pages/LoginMobile";
import Signup from "./features/pages/SignupMobile";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        {/* <Layout> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Layout />}>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
        {/* </Layout> */}
      </Router>

      {/* <Layout>
        <MyProfile />
      </Layout> */}
    </ThemeProvider>
  );
}

export default App;
