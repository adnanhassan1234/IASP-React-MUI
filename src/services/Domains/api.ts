import { get } from "@utils/apiUtils";
import { ApiResponse } from "src/types/ApiResponse";
import { IDomain } from "@interfaces/IDomain";
const baseURL: string = "Domains";
export const getAllDomains = async (): Promise<ApiResponse<IDomain[]>> => {
  try {
    const response: any = await get(`${baseURL}/getAll`);
    return { type: "success", data: response.data.dataResult as IDomain[] };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};
