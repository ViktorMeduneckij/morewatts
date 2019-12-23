import { canUseDOM } from "exenv";

const detectSmallDevice = screenSize => {
  if (canUseDOM) {
    if (window.innerWidth < screenSize) return true;
  }

  return false;
};

export default detectSmallDevice;
