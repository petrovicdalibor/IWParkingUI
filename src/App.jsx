import { ThemeProvider } from "@emotion/react";
import { Button, Grid, TextField, Typography } from "@mui/material";

import Theme from "./theme/Theme";
import { Layout } from "./layouts/Layout";

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
        <Typography variant="h2">IWParking h2</Typography>
        <Typography variant="h3">IWParking h3</Typography>
        <Typography paragraph>IWParking</Typography>

        <div>
          <Button
            sx={{ width: "200px", margin: "10px" }}
            variant="contained"
            color="primary"
          >
            Primary
          </Button>
          <Button
            sx={{ width: "200px", margin: "10px" }}
            variant="contained"
            color="secondary"
          >
            Secondary
          </Button>
          <Button
            sx={{ width: "200px", margin: "10px" }}
            variant="contained"
            color="error"
          >
            Error
          </Button>
          <br />
          <Button
            sx={{ width: "200px", margin: "10px" }}
            variant="contained"
            color="warning"
          >
            Warning
          </Button>
          <Button
            sx={{ width: "200px", margin: "10px" }}
            variant="contained"
            color="info"
          >
            Info
          </Button>
          <Button
            sx={{ width: "200px", margin: "10px" }}
            variant="contained"
            color="success"
          >
            Success
          </Button>
          <Grid container spacing={1}>
            <Grid item>
              <TextField
                label="Test 1"
                variant="filled"
                InputProps={{ disableUnderline: true }}
                color="secondary"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Test 2"
                variant="filled"
                InputProps={{ disableUnderline: true }}
                color="primary"
                type="text"
                fullWidth
              />
            </Grid>
          </Grid>
        </div>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
