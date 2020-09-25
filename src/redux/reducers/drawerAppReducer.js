import { OPEN, CLOSE } from "../types";

const initialState = {
  isOpen: false,
};

const drawerAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN:
      return {
        ...state,
        isOpen: true,
      };
    case CLOSE:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};
export default drawerAppReducer;
