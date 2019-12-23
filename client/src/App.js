import React from "react";
import { Router } from "@reach/router";
import Home from "./components/Home";
import Event from "./components/Event";
import Login from "./components/Login";
import Cookies from "js-cookie";
import EventForms from "./components/EventForms";
import ExistingEventForm from "./components/EventForms/Steps/ExistingEventForm";
import NewEvent from "./components/EventForms/Steps/NewEvent";

import "./global.css";
import "normalize.css";
import "./styles.css";

const App = () => {
  const PrivateRoute = ({ as: Comp, ...rest }) => {
    const isAuthed = Cookies.get("isLoggedIn");
    const hasName = Cookies.get("name");
    const hasEmail = Cookies.get("email");

    return isAuthed && hasName && hasEmail ? <Comp {...rest} /> : <Login />;
  };

  return (
    <>
      <Router>
        <Login path="/login" />
        <PrivateRoute as={Home} path="/" />
        <PrivateRoute as={Event} path="/event/:id" />
        <PrivateRoute as={EventForms} path="/event/add" />
        <PrivateRoute as={ExistingEventForm} path="/new/existing-event/:id" />
        <PrivateRoute as={NewEvent} path="/new-event/:type" />
      </Router>
    </>
  );
};

export default App;
