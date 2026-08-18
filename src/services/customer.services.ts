import type { AxiosResponse } from "axios";
import type {
  AuthResponse,
  GetMeResponse,
  LoginDTO,
  LogoutResponse,
  SignUpDTO,
} from "../types/customer.type";
import { axiosInstance } from "../api/axios";

export const signUp = (
  data: SignUpDTO
): Promise<AxiosResponse<AuthResponse>> => {
  return axiosInstance.post(`/auth/storefront/signup`, data);
};

export const login = (data: LoginDTO): Promise<AxiosResponse<AuthResponse>> => {
  return axiosInstance.post(`/auth/storefront/login`, data);
};

export const logout = (): Promise<AxiosResponse<LogoutResponse>> => {
  return axiosInstance.post(`auth/storefront/logout`);
};

export const getMe = (): Promise<AxiosResponse<GetMeResponse>> => {
  return axiosInstance.get(`/customer/getMe`);
};
