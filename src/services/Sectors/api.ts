import { get } from "@utils/apiUtils";
import { ISector } from "@interfaces/ISector";
import { ApiResponse } from "src/types/ApiResponse";
const baseURL = `Sectors`;
export const getAllSectors = async (): Promise<ApiResponse<ISector[]>> => {
  try {
    const response: any = await get(`${baseURL}/getAll`);
    return { type: "success", data: response.data.dataResult as ISector[] };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const getSectorById = async (
  id: string
): Promise<ApiResponse<ISector>> => {
  try {
    const response: any = await get(`${baseURL}/getById/${id}`);
    return { type: "success", data: response.data.dataResult as ISector };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};
