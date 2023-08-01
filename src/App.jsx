/*import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LoginMobile from './features/pages/LoginMobile.jsx';
import SignupMobile from './features/pages/SignupMobile.jsx';
import { Proba } from './features/pages/Proba.jsx';

// please make sure that you have different constant file where you will manage those route and possibly make dynamic create of routes

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginMobile />}></Route>
        <Route path="/signup" element={<SignupMobile />}></Route>
        <Route path="/proba" element={<Proba />}></Route>
        <Route path="*" element={<div>Not found</div>}></Route>
      </Routes>
    </Router>

  )
}

export default <App>*/


import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import routes from './shared/constants/routes.js';

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        ))}
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;



