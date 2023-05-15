import axios, { AxiosRequestConfig } from 'axios';

const baseURL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const baseInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

baseInstance.interceptors.response.use(({ data }) => data);

const apiRequest = {
  get: (url: string, config?: AxiosRequestConfig) => baseInstance.get(url, config),
  delete: (url: string, config?: AxiosRequestConfig) => baseInstance.delete(url, config),
  post: (url: string, data: any, config?: AxiosRequestConfig) =>
    baseInstance.post(url, data, config),
};

export default apiRequest;
