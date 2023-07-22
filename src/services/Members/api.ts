// @ts-nocheck
import { get, post, put, remove } from "@utils/apiUtils";
import { ApiResponse } from "src/types/ApiResponse";
import { IMember } from "@interfaces/IMember";

const baseURL: string = "Members";

export const getAllMembers = async (): Promise<ApiResponse<IMember[]>> => {
  try {
    const response: any = await get(`${baseURL}/getAllForDashboard`);
    return { type: "success", data: response?.data.dataResult as any };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const getMembersByDomainId = async (
  id: string
): Promise<ApiResponse<any>> => {
  try {
    const response: any = await get(`${baseURL}/getAll/${id}`);
    return { type: "success", data: response.data as any };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const getMemberById = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const response = await get(`${baseURL}/getById/${id}`);
    return { type: "success", data: response.data as any };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const addMember = async (memberData: any): Promise<ApiResponse<any>> => {
  try {
    const response = await post(`${baseURL}/add`, memberData);
    return { type: "success", data: response.data as any };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const updateMember = async (
  memberData: any
): Promise<ApiResponse<any>> => {
  try {
    const response: any = await post(`${baseURL}/edit`, memberData);
    return { type: "success", data: response.data };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const deleteMember = async (
  memberData: any
): Promise<ApiResponse<any>> => {
  try {
    const response: any = await remove(`${baseURL}/delete`, memberData);
    return { type: "success", data: response.data as any };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};
