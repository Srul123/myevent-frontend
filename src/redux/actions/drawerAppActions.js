import { OPEN, CLOSE } from "../types";

const openDrawerLeft = () => {
    return {
        type: OPEN,
    };
};

const closeDrawerLeft = () => {
    return {
      type: CLOSE,
  };
};


export default {
    openDrawerLeft,
    closeDrawerLeft
};
