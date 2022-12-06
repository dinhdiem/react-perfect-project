import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store";

const instance = axios.create({
  baseURL: "http://localhost:8081/",
});

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

instance.interceptors.request.use(
  function (config) {
    const access_token = store?.getState()?.user?.account.access_token;
    config.headers["Authorization"] = `Bearer ${access_token}`;
    NProgress.start();
    // NProgress.inc();

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
