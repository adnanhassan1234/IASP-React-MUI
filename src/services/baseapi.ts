import axios, { AxiosInstance } from "axios";
// import { IApiConfig } from "@interfaces/IApiConfig";

const api: AxiosInstance = axios.create({
  baseURL: "https://iapstest.peoplefirstdevelopment.org/api",
});

api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
