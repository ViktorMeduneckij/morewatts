import React from "react";
import { Router } from "@reach/router";
import Home from "./components/Home";
import Event from "./components/Event";
import Cookies from "js-cookie";
import EventForms from "./components/EventForms";
import ExistingEventForm from "./components/EventForms/Steps/ExistingEventForm";
import NewEvent from "./components/EventForms/Steps/NewEvent";
import EditEvent from "./components/EventForms/Steps/EditEvent";
import Login from "./components/Login";
import PrivacyPolicy from "./components/PrivacyPolicy";

import "./global.css";
import "normalize.css";
import "./styles.css";

const App = () => {
  const PrivateRoute = ({ as: Comp, isAdmin, ...rest }) => {
    const userIsAdmin = Cookies.get("isAdmin");

    if (!isAdmin) {
      return <Comp {...rest} />
    } else {
      return userIsAdmin ? (
        <Comp {...rest} />
      ) : (
          <Home />
        );
    }
  };

  return (
    <>
      <Router>
        <PrivacyPolicy path="/privacy-policy" />
        <Home path="/" />
        <Event path="/event/:id" />
        <PrivateRoute as={EventForms} path="/event/add" isAdmin />
        <PrivateRoute
          as={ExistingEventForm}
          path="/new/existing-event/:id"
          isAdmin
        />
        <PrivateRoute as={NewEvent} path="/new-event/:type" isAdmin />
        <PrivateRoute as={EditEvent} path="/event/edit/:id" isAdmin />
        <Login path="/login" />
      </Router>
    </>
  );
};

export default App;
