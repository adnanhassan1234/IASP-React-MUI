import { get, post, put, remove } from "@utils/apiUtils";
// import { any } from "@interfaces/any";
import { ApiResponse } from "src/types/ApiResponse";

const baseURL = "Jobs";

export const getJobById = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const response: any = await get(`${baseURL}/getById/${id}`);
    return { type: "success", data: response.data as any };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const getJobsByDomainId = async (
  id: string
): Promise<ApiResponse<any[]>> => {
  try {
    const response: any = await get(`${baseURL}/getAll/${id}`);
    return { type: "success", data: response?.data?.dataResult };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const addJob = async (jobData: any): Promise<ApiResponse<any>> => {
  try {
    const response: any = await post(`${baseURL}/add`, jobData);
    return { type: "success", data: response.data as any };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const updateJob = async (jobData: any): Promise<ApiResponse<any>> => {
  try {
    const response: any = await put(`${baseURL}/edit`, jobData);
    return { type: "success", data: response.data as any };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const deleteJob = async (jobData: any): Promise<ApiResponse<any>> => {
  try {
    const response: any = await remove(`${baseURL}/delete`, jobData);
    return { type: "success", data: response.data as any };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};
