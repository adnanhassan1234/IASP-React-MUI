import { get, post, remove } from "@utils/apiUtils";
import { ApiResponse } from "src/types/ApiResponse";
import { IProject } from "@interfaces/IProject";

const baseURL: string = "Projects";

export const getAllProjects = async (): Promise<ApiResponse<IProject[]>> => {
  try {
    const response: any = await get(`${baseURL}/getAllforDashboard`);
    return { type: "success", data: response?.data?.dataResult };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const getAllProjectsByDomainId = async (
  domainId: any
): Promise<ApiResponse<any>> => {
  try {
    const response: any = await get(`${baseURL}/getAll/${domainId}`);
    return { type: "success", data: response };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const getProjectById = async (
  id: string
): Promise<ApiResponse<IProject>> => {
  try {
    const response: any = await get(`${baseURL}/getById/${id}`);
    return { type: "success", data: response?.data?.dataResult };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const addProject = async (
  projectData: any
): Promise<ApiResponse<any>> => {
  try {
    const response: any = await post(`${baseURL}/add`, projectData);
    return { type: "success", data: response.data as any };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const updateProject = async (
  projectData: any
): Promise<ApiResponse<any>> => {
  try {
    const response: any = await post(`${baseURL}/edit`, projectData);
    return { type: "success", data: response.data as any };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const deleteProject = async (
  projectData: any
): Promise<ApiResponse<any>> => {
  try {
    const response: any = await remove(`${baseURL}/delete`, projectData);
    return { type: "success", data: response.data as any };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};
