import React, { useState, useEffect } from "react";
import useEventListener from "@use-it/event-listener";
import { isMobile } from "react-device-detect";
import DesktopCalendar from "../DesktopCalendar";
import MobileCalendar from "../MobileCalendar";
import Col2 from "../Col2";
import Hero from "../Hero";
import AdminToolbar from "../AdminToolbar";
import detectSmallDevice from "../../utils/detectSmallDevice";
import Stripe from "../../components/Stripe";
import Footer from "../../components/Footer";

import hero from "../../images/1.png";
import heroMobile from "../../images/1_mobile.png";

const Home = () => {
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEventListener("resize", () => {
    setIsSmallDevice(detectSmallDevice("1024"));
  });

  useEffect(() => {
    setIsSmallDevice(detectSmallDevice("1024"));
  }, []);

  return (
    <>
      <Stripe background="linear-gradient(#507eb1,#709dc7 10%,#dde9f5 38%,#eaf2f9 48%,#f6f9fc 62%)" />
      <div className="container--xl">
        {!isMobile ? <Hero src={hero} /> : <Hero src={heroMobile} />}
      </div>
      <AdminToolbar addEvent />
      <div className="hidden md:flex container--lg py-3">
        <div className="flex items-center px-2">
          <span
            className="block"
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "rgb(63, 142, 252)",
            }}
          ></span>
          <span className="pl-2">Plentas (Road)</span>
        </div>
        <div className="flex items-center px-2">
          <span
            className="block"
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "#12b53b",
            }}
          ></span>
          <span className="pl-2">MTB</span>
        </div>
        <div className="flex items-center px-2">
          <span
            className="block"
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "rgb(245, 230, 99)",
            }}
          ></span>
          <span className="pl-2">Salė (Strength)</span>
        </div>
        <div className="flex items-center px-2">
          <span
            className="block"
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "#f788ab",
            }}
          ></span>
          <span className="pl-2">Staklės (Indoor)</span>
        </div>
        <div className="flex items-center px-2">
          <span
            className="block"
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "#b80791",
            }}
          ></span>
          <span className="pl-2">Kitos (General)</span>
        </div>
      </div>
      <div>{!isSmallDevice ? <DesktopCalendar /> : <MobileCalendar />}</div>
      <div
        className="container--lg py-4 mb-3"
        style={{
          boxShadow: "0 1px 0 0 rgba(0,0,0,.1)",
        }}
      >
        <Col2
          values={{
            leftText: {
              text: "1.",
              className: "text-4xl text-orange-500 text-center",
            },
            rightTitle: "Prisijunkite",
            rightText: "Jūs jau tai padarėte, su tuo ir sveikiname!",
          }}
        />
        <Col2
          values={{
            className: "py-5 bg-gray-200",
            leftText: {
              text: "2.",
              className: "text-4xl text-orange-500 text-center",
            },
            rightTitle: "Susiraskite jums patinkančią treniruotę",
            rightText:
              "Spauskite dalyvavimo mygtuką ir įsitikinkitę, jog esate sąraše.",
          }}
        />
        <Col2
          values={{
            leftText: {
              text: "3.",
              className: "text-4xl text-orange-500 text-center",
            },
            rightTitle: "Viskas!",
            rightText:
              "Džiaugiamės, kad prisijungėt! Iki susitikimo treniruotėje. Jei kartais persigalvosite, atsižymėkit iš sąrašo, tai mums padeda visuomet žinoti tikslų dalyviu skaičių ir taip palaikyti aukštą treniruočių kokybę.",
          }}
        />
      </div>
      <Col2
        values={{
          reverse: true,
          className: "container--lg",
          leftImg: {
            src: "logo.png",
            height: "400px",
            width: "400px",
          },
          rightTitle: "MoreWatts treniruotės",
          rightText:
            "Platformos tikslas- suvienyti dviratininkus ir padėti jiems tobulėti sporte. Vasaromis daugiau treniruočių yra orientuotos į dviratį, žiemą stengiamės siprėti visapusiškai bei palaikyti gerą bendrą fizinę formą. Treniruotės yra skirstomos pagal tipus: <ul class='my-2'><strong><li>Bendras fizinis (strength)</li><li>Plentas (Road)</li><li>MTB</li><li>Staklės (indoor)</li><li>Bendrinės (General)</li></strong></ul> Kai kurios treniruotės yra prieinamos tik MoreWatts nariams, jos yra pažymėtos MoreWatts ženklu. Tapti MoreWatts nariu gali kiekvienas, dėl narystės susisiekite su Donatu Šertvytčiu.",
        }}
      />
      <Footer />
    </>
  );
};

export default Home;
