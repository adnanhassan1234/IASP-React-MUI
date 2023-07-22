import { get, post, put, remove } from "@utils/apiUtils";
import { ApiResponse } from "src/types/ApiResponse";
import { IReport } from "@interfaces/IReport";
const baseURL: string = "Reports";
export const getAllReportsByDomainId = async (
  id: string
): Promise<ApiResponse<IReport[]>> => {
  try {
    const response: any = await get(`${baseURL}/getAll/${id}`);
    return { type: "success", data: response.data.data };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const getAllReports = async (): Promise<ApiResponse<IReport[]>> => {
  try {
    const response: any = await get(`${baseURL}/getAllForDashboard`);
    return { type: "success", data: response?.data?.dataResult };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const getReportById = async (
  id: string
): Promise<ApiResponse<IReport>> => {
  try {
    const response: any = await get(`${baseURL}/getById/${id}`);
    return { type: "success", data: response?.data?.dataResult };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const addReport = async (reportData: any): Promise<ApiResponse<any>> => {
  try {
    const response: any = await post(`${baseURL}/add`, reportData);
    return { type: "success", data: response.data as any };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const updateReport = async (
  reportData: any
): Promise<ApiResponse<any>> => {
  try {
    const response: any = await put(`${baseURL}/edit`, reportData);
    return { type: "success", data: response.data as any };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const deleteReport = async (
  reportData: any
): Promise<ApiResponse<any>> => {
  try {
    const response: any = await remove(`${baseURL}/delete`, reportData);
    return { type: "success", data: response.data as any };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};
