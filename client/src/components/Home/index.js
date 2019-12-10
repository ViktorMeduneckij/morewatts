import React from "react";

import DesktopCalendar from "../DesktopCalendar";
import Header from "../Header";
import Col2 from "../Col2";

const Home = () => (
  <>
    <Header />
    <div>
      <DesktopCalendar />
    </div>
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
    <button className="success mt-3" onClick={() => console.log(1)}>
      Prisijungsiu
    </button>
  </>
);

export default Home;
