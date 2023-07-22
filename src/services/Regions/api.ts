import { get } from "@utils/apiUtils";
import { ApiResponse } from "src/types/ApiResponse";
import { IRegion } from "@interfaces/IRegion";

const baseURL: string = "Regions";

export const getAllRegions = async (): Promise<ApiResponse<IRegion[]>> => {
  try {
    const response: any = await get(`${baseURL}/getAll`);
    return { type: "success", data: response?.data?.dataResult };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};
