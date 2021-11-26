import React, { useEffect, useState } from "react";
import { Main } from "./Main";
import "materialize-css";
import "react-datepicker/dist/react-datepicker.css";
import { Loader } from "./components/Loader";
import { useDispatch } from "react-redux";
import { getServices } from "./store/serviceReducer";
import api from "./http";

function App() {
  return <Main />;
}

export default App;
