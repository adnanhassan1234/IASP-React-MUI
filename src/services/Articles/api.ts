import { get, post, remove } from "@utils/apiUtils";
import { ApiResponse } from "src/types/ApiResponse";
import { IArticle } from "@interfaces/IArticle";

const baseURL: string = "Articles";

export const getAllArticles = async (): Promise<ApiResponse<IArticle[]>> => {
  try {
    const response: any = await get(`${baseURL}/getAllForDashboard`);
    return { type: "success", data: response?.data?.dataResult };
  } catch (error: any) {
    return { type: "error", data: error };
  }
};

export const getAllArticlesByDomainId = async (
  domainId: any
): Promise<ApiResponse<IArticle[]>> => {
  try {
    const response: any = await get(`${baseURL}/getAll/${domainId}`);
    return { type: "success", data: response.data as any };
  } catch (error) {
    // @ts-ignore
    return { type: "error", data: error };
  }
};

export const getArticleById = async (
  id: string
): Promise<ApiResponse<IArticle>> => {
  try {
    const response: any = await get(`${baseURL}/getById/${id}`);
    return { type: "success", data: response.data as any };
  } catch (error) {
    // @ts-ignore
    return { type: "error", data: error };
  }
};

export const addArticle = async (
  articleData: any
): Promise<ApiResponse<IArticle>> => {
  try {
    const response: any = await post(`${baseURL}/add`, articleData);
    return { type: "success", data: response.data as any };
  } catch (error) {
    // @ts-ignore
    return { type: "error", data: error };
  }
};

export const updateArticle = async (
  articleData: any
): Promise<ApiResponse<IArticle>> => {
  try {
    const response: any = await post(`${baseURL}/edit`, articleData);
    return { type: "success", data: response.data as any };
  } catch (error) {
    // @ts-ignore
    return { type: "error", data: error };
  }
};

export const deleteArticle = async (
  articleData: any
): Promise<ApiResponse<IArticle>> => {
  try {
    const response: any = await remove(`${baseURL}/delete`, articleData);
    return { type: "success", data: response.data as any };
  } catch (error) {
    // @ts-ignore
    return { type: "error", data: error };
  }
};
