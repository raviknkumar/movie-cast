import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import './styles/tailwind.css';

/* Using BrowserRouter to handle dynamic requests from Express Server */
import { BrowserRouter } from "react-router-dom";

/* Router components expects to only contain one child component that's why combining everything in App and importing the same */
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
