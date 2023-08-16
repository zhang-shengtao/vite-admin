import axios from "axios";
import config from "#/setting/config";

export const requestToken = [];

export default request = axios.create({
  baseURL: config.baseURL + "/api"
});

// 添加请求拦截器
request.interceptors.request.use((config) => {
  // config.headers.Authorization = "Bearer " + token
  config.cancelToken = new axios.CancelToken((c) => {
    let url = `${config.url}&${config.method}`;
    requestToken.forEach((item, i) => {
      if (item.url == url) {
        item.c();
        requestToken.splice(i, 1);
      }
    });
    requestToken.push({ c, url });
  });
  return config;
});

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    let url = `${response.config.url}&${response.config.method}`;
    requestToken.forEach((item, i) => {
      if (item.url == url) {
        item.c();
        requestToken.splice(i, 1);
      }
    });
    const res = response.data;
    if (res.code >= 200 && res.code < 300) return res;
    else return errorHandle(res.code, res);
  },
  (error) => errorHandle(error)
);

function errorHandle(code, data) {
  switch (code) {
  }
  return Promise.reject(data);
}
