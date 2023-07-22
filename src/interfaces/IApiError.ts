import { AxiosResponse } from "axios";
export interface IApiError {
  message: string;
  code?: number;
  response?: AxiosResponse;
}
