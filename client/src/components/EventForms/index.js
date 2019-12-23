import React, { useState } from "react";
import FirstStep from "./Steps/FirstStep";

const EventForms = () => {
  const step = 0;

  switch (step) {
    case 0:
      return (
        <div>
          <FirstStep />
        </div>
      );
  }
};

export default EventForms;
