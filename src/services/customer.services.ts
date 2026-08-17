import type { AxiosResponse } from "axios";
import type {
  AuthResponse,
  GetMeResponse,
  LoginDTO,
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

export const getMe = (): Promise<AxiosResponse<GetMeResponse>> => {
  return axiosInstance.get(`/customer/getMe`);
};
