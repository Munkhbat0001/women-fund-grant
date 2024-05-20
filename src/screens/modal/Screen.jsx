import { Button, Modal, Skeleton } from "antd";
import React, {
  Suspense,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import ModalScreen from "./ModalScreen";
import useScreen from "../../hooks/useScreen";

const Screen = forwardRef(
  ({ children, clearScreen = () => {}, ...other }, ref) => {
    const { openScreen, hideScreen, open, setData, getData } = useScreen();

    const props = {
      open,
      onCancel: hideScreen,
      ...other,
    };

    useImperativeHandle(ref, () => ({
      setData: (r) => setData(r),
      show: () => openScreen(),
      hide: () => hideScreen(),
      clear: (r) => clearScreen(r),
      getData: () => getData(),
    }));

    return (
      <ModalScreen ref={ref} {...props}>
        {children}
      </ModalScreen>
    );
  }
);

const Tailwind = forwardRef(
  ({ children, clearScreen = () => {}, ...other }, ref) => {
    const { openScreen, hideScreen, open, setData, getData } = useScreen();

    const props = {
      open,
      onCancel: hideScreen,
      ...other,
    };

    useImperativeHandle(ref, () => ({
      setData: (r) => setData(r),
      show: () => openScreen(),
      hide: () => hideScreen(),
      clear: (r) => clearScreen(r),
      getData: () => getData(),
    }));

    return (
      <ModalScreen ref={ref} {...props}>
        {children}
      </ModalScreen>
    );
  }
);

const ScreenContext = React.createContext({});
const ScreenProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  const openScreen = () => setOpen(true);
  const hideScreen = () => setOpen(false);

  const getData = () => data;

  const contextProps = {
    open,
    openScreen,
    hideScreen,
    setData,
    getData,
  };

  return (
    <ScreenContext.Provider value={contextProps}>
      {children}
    </ScreenContext.Provider>
  );
};

export { ScreenContext, ScreenProvider };

export default forwardRef((props, ref) => {
  return (
    <ScreenProvider>
      <Screen {...props} ref={ref} />
    </ScreenProvider>
  );
});

const TailwindScreen = forwardRef((props, ref) => {
  return (
    <ScreenProvider>
      <Tailwind {...props} ref={ref} />
    </ScreenProvider>
  );
});

export { TailwindScreen };
