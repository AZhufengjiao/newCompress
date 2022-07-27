import axios from "axios";
const http = axios.create({
  baseURL: "https://upload.qiniup.com",
  timeout: 5000,
});

http.interceptors.response.use(
  (res) => {
    return res?.data?.data || res;
  },
  (e) => Promise.reject(e)
);

export { http };
