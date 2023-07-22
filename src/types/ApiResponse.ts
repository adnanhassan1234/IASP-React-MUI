import { IApiError } from "@interfaces/IApiError";
export type ApiResponse<T> =
  | {
      type: "success";
      data: T;
    }
  | {
      type: "error";
      data: IApiError;
    };
