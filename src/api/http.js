import rootAxios from "axios";
import { API_ENDPOINT } from "../config";
import { HTTP_401_MSG } from "../config/constants";

let isRefreshing = false;
let requestQueue = [];

export const getHttpErrMsg = err => {
  return err.response ? err.response.data : { message: err.message };
};

export const processQueue = (err, data) => {
  requestQueue.forEach((prom, i) => {
    if (err) prom.reject({ err, config: prom.requestConfig });
    else prom.resolve({ data, config: prom.requestConfig });
  });
  requestQueue = [];
};

export const createRelativeUrl = () => {
  const params = new URLSearchParams(window.location.search);

  if (params.get("redirect")) return encodeURIComponent(params.get("redirect"));

  return encodeURIComponent(
    window.location.pathname +
      (params.toString() || "") +
      (window.location.hash || "")
  );
};

export const handleRefreshToken = requestConfig => {
  console.log("refreshing...");

  isRefreshing = true;

  return http
    .get(`/auth/refresh-token`, {
      withCredentials: true
    })
    .then(res => {
      requestConfig && (requestConfig._refreshed = true);

      processQueue(null);

      return Promise.resolve(requestConfig ? http.request(requestConfig) : res);
    })
    .catch(err => {
      processQueue(err);

      return Promise.reject(err);
    })
    .finally(() => {
      isRefreshing = false;
    });
};

const http = rootAxios.create({
  baseURL: API_ENDPOINT
});

http.interceptors.request.use(function(config) {
  if (
    config.headers["authorization"] ||
    /delete|put|post|patch/.test(config.method)
  )
    config.withCredentials =
      config.withCredentials === undefined ? true : config.withCredentials;

  const source = rootAxios.CancelToken.source(); // create new source token on every request

  config.cancelToken = source.token;

  return config;
});

http.interceptors.response.use(
  response => {
    return Promise.resolve(response.data);
  },
  async err => {
    const requestConfig = err.config;

    if (rootAxios.isCancel(err)) return Promise.reject(err);

    if (err.response?.status === 401) {
      console.log("in 401...");
      if (isRefreshing) {
        console.log("handle api in is refreshing....");
      } else if (requestConfig.withCredentials && !requestConfig._noRefresh)
        return handleRefreshToken(requestConfig);
    }

    return Promise.reject(getHttpErrMsg(err));
  }
);

export default http;
