import axios from "axios";
import { message } from "antd";

// axios.defaults.baseURL = ""
axios.defaults.withCredentials = true;

const useAxios = (url, payload = {}, options = {}) => {
  let token = "";

  options = {
    method: "GET",
    showError: true,
    showSuccess: false,
    showLoader: true,
    throwError: true,
    ...options,
  };

  let headers = {};
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    headers.Authorization = `Bearer ${user.token}`;
    token = user.token;
  }

  let config = {
    method: options.method,
    url: "api" + url,
    data: payload,
    headers,
    showLoader: options.showLoader,
  };

  if (options.responseType) {
    config.responseType = "arraybuffer";
  }

  return axios(config)
    .then(({ data }) => {
      if (options.showSuccess === true)
        message.success(data && data.message ? data.message : "Амжилттай");
      return data;
    })
    .catch((error) => {
      const { showError } = options;
      if (
        error.message.includes("502 Bad Gateway") ||
        error.message.includes("Error occured")
      ) {
        message.error(error.message);
      }

      if (
        (error.message.includes("403") || error.message.includes("400")) &&
        showError === true
      ) {
        if (error.response.data.message)
          message.error(error.response.data.message);
      }

      // throw Exception()
      return Promise.reject(error);
    });
};

export const request = (requestData) => {
  return axios(requestData).catch((err) => {
    return Promise.reject(err);
  });
};

export default useAxios;
