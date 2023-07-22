import { post } from "@utils/apiUtils";
import { IApiResponse } from "@interfaces/IApiResponse";
import { ILoginData } from "@interfaces/ILoginData";
import { IRegisterData } from "@interfaces/IRegisterData";
import { IPasswordData } from "@interfaces/IPasswordData";
const baseURL: string = "Accounts";

export const login = async (loginData: ILoginData): Promise<IApiResponse> => {
  try {
    const response = await post(`${baseURL}/login`, loginData);
    return { type: "success", data: response.data as any };
  } catch (error) {
    return { type: "error", data: error };
  }
};

export const registerAdmin = async (
  registerData: IRegisterData
): Promise<IApiResponse> => {
  try {
    const response = await post(`${baseURL}/registerAdmin`, registerData);
    return { type: "success", data: response.data as any };
  } catch (error) {
    return { type: "error", data: error };
  }
};

export const changePassword = async (
  passwordData: IPasswordData
): Promise<IApiResponse> => {
  try {
    const response = await post(`${baseURL}/changePassword`, passwordData);
    return { type: "success", data: response.data as any };
  } catch (error) {
    return { type: "error", data: error };
  }
};
