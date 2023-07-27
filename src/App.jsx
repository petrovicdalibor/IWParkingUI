import { ThemeProvider } from "@emotion/react";
import { Button, Typography } from "@mui/material";

import Theme from "./theme/Theme";
import { Layout } from "./layouts/Layout";

function App() {
  return (
    <ThemeProvider theme={Theme}>
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
        </div>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
