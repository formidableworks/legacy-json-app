import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "@fontsource/roboto";
import { CssBaseline } from "@material-ui/core";

const rootNode = document.getElementById("root") as HTMLElement;

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  rootNode
);
