import axios from 'axios'


export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    withCredentials: true
  })

  //2.axios拦截器
  //2.1 axios请求拦截器
  instance.interceptors.request.use(config => {
    // console.log(config);
    return config;
  }, err => {
    // console.log(err);
    return err;
  })
  //2.2 axios响应拦截器
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data;
  }, err => {
    // console.log(err);
    return err;
  })

  //3.发送真正的网络请求
  return instance(config)
}