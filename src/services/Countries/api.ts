import { get } from "@utils/apiUtils";
import { ApiResponse } from "src/types/ApiResponse";
import { ICountry } from "@interfaces/ICountry";

const baseURL = "Countries";

export const getAllCountries = async (): Promise<ApiResponse<ICountry[]>> => {
  try {
    const response: any = await get(`${baseURL}/getAll`);
    return { type: "success", data: response?.data?.dataResult };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};
