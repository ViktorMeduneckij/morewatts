import React from "react";
import { Router } from "@reach/router";
import Home from "./components/Home";
import Event from "./components/Event";
import Login from "./components/Login";

import "./global.css";
import "normalize.css";
import "./styles.css";

const App = () => {
  return (
    <>
      <Router>
        <Home path="/" />
        <Event path="/event/:id" />
        <Login path="/login" />
      </Router>
    </>
  );
};

export default App;
