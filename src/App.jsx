import { ThemeProvider } from "@emotion/react";
import { Button, Grid, TextField, Typography } from "@mui/material";

import Theme from "./theme/Theme";
import { Layout } from "./layouts/Layout";
import MyProfile from "./pages/MyProfile";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Layout>
        <MyProfile />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
