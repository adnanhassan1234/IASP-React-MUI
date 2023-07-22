import { AxiosRequestConfig } from "axios";
export interface IApiConfig extends AxiosRequestConfig {
  headers: {
    Authorization?: string;
  };
}
