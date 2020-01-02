import React from "react";

import Facebook from "../../images/facebook.svg";
import Instagram from "../../images/instagram.svg";

const Footer = () => (
  <div
    className="pt-6 mt-6 flex justify-center flex-wrap"
    style={{ borderTop: "2px solid rgba(207,215,223,.25)" }}
  >
    <div className="flex mb-3">
      <a
        className="mr-5"
        href="https://www.facebook.com/morewatts/"
        style={{ width: "30px", height: "30px" }}
      >
        <img src={Facebook} style={{ maxWidth: "30px" }} />
      </a>
      <a
        href="https://www.instagram.com/morewatts/"
        style={{ width: "30px", height: "30px" }}
      >
        <img src={Instagram} style={{ maxWidth: "30px" }} />
      </a>
    </div>
    <span className="w-full flex justify-center">
      <a href="/privacy-policy" className="pr-3 underline">
        Privatumo politika
      </a>
      <p>©MoreWatts</p>
    </span>
  </div>
);

export default Footer;
