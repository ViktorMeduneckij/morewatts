import React from "react";
import "./index.css";
import { navigate } from "@reach/router";

const Header = () => {
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header>
      <div className="container--lg">
        <div className="flex items-center justify-center my-5">
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
            MoreWatts training
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
