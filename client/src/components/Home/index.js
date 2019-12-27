import React, { useState, useEffect } from "react";
import useEventListener from "@use-it/event-listener";

import DesktopCalendar from "../DesktopCalendar";
import MobileCalendar from "../MobileCalendar";
import Header from "../Header";
import Col2 from "../Col2";
import Hero from "../Hero";
import AdminToolbar from "../AdminToolbar";
import detectSmallDevice from "../../utils/detectSmallDevice";

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
      <div className="container--xl">
        <Hero
          src="https://i.imgur.com/maEGrIJ.jpg"
          overlay
          title="MoreWatts treniruotės"
          subtitle="Siek savo tikslų su bendraminčiais"
        />
      </div>
      <Header />
      <AdminToolbar addEvent />
      <div>{!isSmallDevice ? <DesktopCalendar /> : <MobileCalendar />}</div>
      <Col2
        values={{
          className: "container--lg",
          leftImg: {
            src: "logo.png",
            height: "400px",
            width: "400px",
          },
          rightTitle: "MoreWatts treniruotes",
          rightText:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        }}
      />
    </>
  );
};

export default Home;
