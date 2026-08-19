import type { AxiosResponse } from "axios";
import type {
  CartDTO,
  AddToCartResponse,
  getCartResponse,
} from "../types/cart.type";
import { axiosInstance } from "../api/axios";

export const addToCart = (
  data: CartDTO
): Promise<AxiosResponse<AddToCartResponse>> => {
  return axiosInstance.post(`/cart`, data);
};

export const getCart = (): Promise<AxiosResponse<getCartResponse>> => {
  return axiosInstance.get(`/cart`);
};
