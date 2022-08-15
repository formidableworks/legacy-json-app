import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { MonacoJsonEditor } from "./monacoJsonEditor/MonacoJsonEditor";

export function App(): JSX.Element {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Hello there!</Typography>
      </Grid>
      <Grid item xs={12}>
        <MonacoJsonEditor />
      </Grid>
    </Grid>
  );
}
