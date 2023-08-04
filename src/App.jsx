import { ThemeProvider } from "@emotion/react";

import Theme from "./theme/Theme";
import { Layout } from "./layouts/Layout";

import {
  Route,
  // Routes,
  BrowserRouter as Router,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import {
//   routesForAuthenticatedOnly,
//   routesForNotAuthenticatedOnly,
//   routesForPublic,
// } from "./common/constants/routes";
import Login from "./features/pages/LoginMobile";
import Signup from "./features/pages/SignupMobile";
import AuthProvider from "./context/AuthProvider";
import Routes from "./routes";

function App() {
  // const router = createBrowserRouter([
  //   ...routesForPublic,
  //   ...(!token ? routesForNotAuthenticatedOnly : []),
  //   ...routesForAuthenticatedOnly,
  // ]);

  return (
    <AuthProvider>
      <ThemeProvider theme={Theme}>
        <Routes />

        {/* <Router> */}
        {/* <Layout> */}
        {/* <Routes>
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
          </Routes> */}
        {/* </Layout> */}
        {/* </Router> */}

        {/* <Layout>
        <MyProfile />
      </Layout> */}
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
