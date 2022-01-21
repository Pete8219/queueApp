import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import "./styles.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";
import { Layout } from "./components/Layout";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </Provider>,
  rootElement
);

reportWebVitals();
