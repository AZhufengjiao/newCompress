import axios from "axios";
import config from "./config";
import baseUrl from "./config";

// 2.创建 baseURL 变量用于存储基准的请求地址
// const baseURL = "http://localhost:8080";
// const baseURL = "http://demo.heycut.com";

//1.创建一个新的axios 实例对象 专门用来配置相关的请求、
const instanceWithoutToken = axios.create({
  baseUrl,
});

instanceWithoutToken.interceptors.request.use(
  (config) => {
    config.headers["Cross-Origin-Opener-Policy"] = "same-origin";
    config.headers["Cross-Origin-Embedder-Policy"] = "require-corp";
    // console.log("headers", config.headers);
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);
// axios.defaults.headers.common["Cross-Origin-Opener-Policy"] = "same-origin";
// axios.defaults.headers.common["Cross-Origin-Embedder-Policy"] = "require-corp";

//不携带token响应拦截
// instanceWithoutToken.interceptors.response.use((response) => {
//   return response.data;
// });

// 用于生成请求配置的函数
function generateRequestConfig(url, method, data) {
  return {
    url,
    method,
    [method === "get" ? "params" : "data"]: data,
  };
}

//用于发送普通请求 不带token
export function requestWithoutToken(url, method, data) {
  return instanceWithoutToken(generateRequestConfig(url, method, data));
}
