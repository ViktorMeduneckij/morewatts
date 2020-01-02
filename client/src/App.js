import React from "react";
import { Router } from "@reach/router";
import Home from "./components/Home";
import Event from "./components/Event";
import Login from "./components/Login";
import Cookies from "js-cookie";
import EventForms from "./components/EventForms";
import ExistingEventForm from "./components/EventForms/Steps/ExistingEventForm";
import NewEvent from "./components/EventForms/Steps/NewEvent";
import EditEvent from "./components/EventForms/Steps/EditEvent";
import PrivacyPolicy from "./components/PrivacyPolicy";
import { MW_MEMBERS } from "./constants";

import "./global.css";
import "normalize.css";
import "./styles.css";

const App = () => {
  const PrivateRoute = ({ as: Comp, isAdmin, ...rest }) => {
    const isAuthed = Cookies.get("isLoggedIn");
    const hasName = Cookies.get("name");
    const hasEmail = Cookies.get("email");
    let adminDisplay = false;

    const userIsAdmin = MW_MEMBERS.filter(
      member => member.name === Cookies.get("name") && member.admin === true
    );

    if (userIsAdmin.length > 0) {
      adminDisplay = true;
    }

    if (!isAdmin) {
      return isAuthed && hasName && hasEmail ? <Comp {...rest} /> : <Login />;
    } else {
      return isAuthed && hasName && hasEmail && adminDisplay ? (
        <Comp {...rest} />
      ) : (
        <Login />
      );
    }
  };

  return (
    <>
      <Router>
        <Login path="/login" />
        <PrivacyPolicy path="/privacy-policy" />
        <PrivateRoute as={Home} path="/" />
        <PrivateRoute as={Event} path="/event/:id" />
        <PrivateRoute as={EventForms} path="/event/add" isAdmin />
        <PrivateRoute
          as={ExistingEventForm}
          path="/new/existing-event/:id"
          isAdmin
        />
        <PrivateRoute as={NewEvent} path="/new-event/:type" isAdmin />
        <PrivateRoute as={EditEvent} path="/event/edit/:id" isAdmin />
      </Router>
    </>
  );
};

export default App;
