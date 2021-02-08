import React from "react";
import ReactDom from "react-dom";
import App from "../src";
function renderApp() {
  ReactDom.render(<App />, document.getElementById("root"));
}

function runApp() {
  renderApp();
}

runApp();
