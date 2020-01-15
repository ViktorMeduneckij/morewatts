import React, { useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import Cookies from "js-cookie";
import { navigate } from "@reach/router";

import backgroundImg from "../../images/background.jpeg";
import { MW_MEMBERS } from "../../constants";

import "./index.css";

const Login = () => {
  useEffect(() => {
    document
      .getElementsByTagName("html")[0]
      .setAttribute("class", "Login-html");
  });

  const contentStyle = {
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    border: "1px solid #cbd5e0",
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const attemptMwMember = email => {
    const isMw = MW_MEMBERS.filter(item => {
      if (item.email.toLowerCase() === email.toLowerCase()) {
        return true;
      }

      return false;
    });

    if (isMw.length <= 0) {
      return false;
    } else {
      return true;
    }
  };

  const responseFacebook = response => {
    if (response.name && response.email && response.userID) {
      const isMw = attemptMwMember(response.email);

      Cookies.set("name", response.name);
      Cookies.set("email", response.email);
      Cookies.set("isLoggedIn", true);
      if (isMw) {
        Cookies.set("morewatts", true);
      } else {
        Cookies.set("morewatts", false);
      }

      navigate(`/`);
      window.location.reload(false);
    }
  };

  return (
    <div className="relative ss" style={backgroundStyle}>
      <div
        className="absolute flex overflow-hidden md:items-stretch flex-col md:flex-row"
        style={contentStyle}
      >
        <div
          className="p-2 md:p-5 text-white text-center text-sm"
          style={{
            maxWidth: "300px",
            backgroundColor: "rgba(66, 153, 225, 0.9)",
          }}
        >
          <h1 className="text-base">
            Sveiki atvykę į MoreWatts treniruočių platformą!
          </h1>
          <div className="md:pt-5">
            Mes naudojame Facebook prisijungimą, kad žinotume, kas esate.
          </div>
        </div>
        <div
          className="md:px-5 flex items-center"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
        >
          <FacebookLogin
            appId="253683672236382"
            autoLoad={true}
            fields="name,email"
            callback={responseFacebook}
            disableMobileRedirect={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
