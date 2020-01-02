import React from "react";
import { navigate } from "@reach/router";
import logo from "../../images/logo.png";

const Header = () => {
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header>
      <div className="container--lg">
        <div className="flex items-center justify-center my-5 text-black">
          <img
            src={logo}
            alt=""
            style={{ maxWidth: "70px" }}
            onClick={handleLogoClick}
            className="cursor-pointer"
          />
          <p
            onClick={handleLogoClick}
            style={{
              cursor: "pointer",
              fontSize: "30px",
              fontWeight: "bold",
              letterSpacing: "1.5px",
              textAlign: "center",
            }}
          >
            MoreWatts treniruotės
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
