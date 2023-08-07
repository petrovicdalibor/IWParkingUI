import { ThemeProvider } from "@emotion/react";

import Theme from "./theme/Theme";
import { Layout } from "./layouts/Layout";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import routes from "./common/constants/routes.js";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/authProvider";

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
