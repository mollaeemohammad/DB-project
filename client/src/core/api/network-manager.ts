import { keysToCamel } from "./../../util/helper";
import axios from "axios";
import qs from "qs";
// import { keysToSnake } from "util/helper";

import { APP_BASE_URL, VOIP_BASE_URL } from "./config";

import Cookies from 'js-cookie';

const TOK = Cookies.get("TOK");
const headers = {
  // Accept: "*/*",
  "Content-Type": "application/json",
  // Content: "application/json"
};

const paramsSerializer = (params: any) => {
  return qs.stringify(params, { indices: false, skipNulls: true });
};

const appNetworkManager = axios.create({
  baseURL: APP_BASE_URL,
  headers,
  paramsSerializer,
});

appNetworkManager.interceptors.request.use((req) => {
  if (process.env.NODE_ENV !== "production") {
    console.log("API Req", req);
  }
  // req.data = keysToSnake(req.data);
  return req;
});

appNetworkManager.interceptors.response.use(
  (res) => {
    if (process.env.NODE_ENV !== "production") {
      console.log("API Res", res);
    }
    // res.data = keysToCamel(res.data);
    return res;
  },
  (error) => {
    if (process.env.NODE_ENV !== "production") {
      console.log("API Error", error);
    }
    if (error.response) {
      // error.response.data = keysToCamel(error.response.data);
      console.log(error.response.data);
    }

    return Promise.reject(error);
  }
);

const voipNetworkManager = axios.create({
  baseURL: VOIP_BASE_URL,
  headers,
  paramsSerializer,
});

voipNetworkManager.interceptors.request.use((req) => {
  if (process.env.NODE_ENV !== "production") {
    console.log("VOIP Req", req);
  }

  return req;
});

voipNetworkManager.interceptors.response.use(
  (res) => {
    if (process.env.NODE_ENV !== "production") {
      console.log("VOIP Res", res);
    }
    res.data = keysToCamel(res.data);
    return res;
  },
  (error) => {
    if (process.env.NODE_ENV !== "production") {
      console.log("VOIP Error", error);
    }
    if (error.response) {
      error.response.data = keysToCamel(error.response.data);
      console.log(error.response.data);
    }

    return Promise.reject(error);
  }
);

export { appNetworkManager, voipNetworkManager };
