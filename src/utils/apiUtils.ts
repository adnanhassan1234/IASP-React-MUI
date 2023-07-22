import api from "@services/baseapi";
import { AxiosRequestConfig } from "axios";
import { IApiError } from "@interfaces/IApiError";
import { ApiResponse } from "../types/ApiResponse";

export const get = async <T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<ApiResponse<T>> => {
  try {
    const response: any = await api.get<T>(
      `https://iapstest.peoplefirstdevelopment.org/api/${url}`,
      config
    );
    return { type: "success", data: response.data as any };
  } catch (error: any) {
    const apiError: IApiError = {
      message: error.message,
      code: error.code,
      response: error.response,
    };
    return { type: "error", data: apiError };
  }
};

export const post = async <T>(
  url: string,
  data: Record<string, any> = {},
  config: AxiosRequestConfig = {}
): Promise<ApiResponse<T>> => {
  try {
    const response: any = await api.post<T>(
      `https://iapstest.peoplefirstdevelopment.org/api/${url}`,
      data,
      config
    );
    return { type: "success", data: response.data as any };
  } catch (error: any) {
    const apiError: IApiError = {
      message: error.message,
      code: error.code,
      response: error.response,
    };
    return { type: "error", data: apiError };
  }
};

export const put = async <T>(
  url: string,
  data: Record<string, any> = {},
  config: AxiosRequestConfig = {}
): Promise<ApiResponse<T>> => {
  try {
    const response: any = await api.post<T>(
      `https://iapstest.peoplefirstdevelopment.org/api/${url}`,
      data,
      config
    );
    return { type: "success", data: response.data as any };
  } catch (error: any) {
    const apiError: IApiError = {
      message: error.message,
      code: error.code,
      response: error.response,
    };
    return { type: "error", data: apiError };
  }
};

export const remove = async <T>(
  url: string,
  data: Record<string, any>,
  config: AxiosRequestConfig = {}
): Promise<ApiResponse<T>> => {
  try {
    const response: any = await api.post<T>(
      `https://iapstest.peoplefirstdevelopment.org/api/${url}`,
      data,
      config
    );
    return { type: "success", data: response.data as any };
  } catch (error: any) {
    const apiError: IApiError = {
      message: error.message,
      code: error.code,
      response: error.response,
    };
    return { type: "error", data: apiError };
  }
};
