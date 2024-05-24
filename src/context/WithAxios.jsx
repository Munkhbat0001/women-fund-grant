import { useContext, useEffect } from "react";
import axios from "axios";
import { SystemContext } from "./SystemContext";

const WithAxios = ({ children }) => {
  const { setLoading } = useContext(SystemContext);

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        if (config.showLoader === true) {
          setLoading(true);
        }

        return config;
      },
      (error) => {
        if (error.config.showLoader === true) setLoading(false);
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        if (response.config.showLoader === true) setLoading(false);
        return response;
      },
      (error) => {
        if (error.config.showLoader === true) setLoading(false);
        return Promise.reject(error);
      }
    );
  }, [setLoading]);

  return children;
};

export default WithAxios;
