import { createContext } from "react";

const StateContext = createContext({
  token: null,
  role: null,
  userId: null,
});

export default StateContext;
