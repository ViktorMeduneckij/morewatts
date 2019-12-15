import React, { useState } from "react";
import FirstStep from "./Steps/FirstStep";

const EventForms = () => {
  const [step, setStep] = useState(0);

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
