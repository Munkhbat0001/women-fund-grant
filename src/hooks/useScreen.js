import { useContext } from "react";
import { ScreenContext } from "../screens/modal/Screen";

const useScreen = () => {
  return useContext(ScreenContext);
};

export default useScreen;
