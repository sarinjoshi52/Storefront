import type { AxiosResponse } from "axios";
import type {
  CartDTO,
  AddToCartResponse,
  getCartResponse,
  removeFromCartResponse,
  updateCartDTO,
  updateCartResponse,
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

export const removeFromCart = (
  productId: string
): Promise<AxiosResponse<removeFromCartResponse>> => {
  return axiosInstance.delete(`/cart/${productId}`);
};

export const updateCart = (
  data: updateCartDTO
): Promise<AxiosResponse<updateCartResponse>> => {
  return axiosInstance.patch(`/cart`, data);
};
