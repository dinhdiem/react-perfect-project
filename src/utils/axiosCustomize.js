import axios from "axios";
import NProgress from "nprogress";

const instance = axios.create({
  baseURL: "http://localhost:8081/",
});

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

instance.interceptors.request.use(
  function (config) {
    NProgress.start();
    NProgress.inc();

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    return response && response.data ? response.data : response;
  },
  function (error) {
    NProgress.done();
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
