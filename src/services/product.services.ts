import type { AxiosResponse } from "axios";
import type {
  GetAllProductsResponse,
  GetOneProductResponse,
} from "../types/product.type";
import { axiosInstance } from "../api/axios";

export const getProduct = (): Promise<
  AxiosResponse<GetAllProductsResponse>
> => {
  return axiosInstance.get("/products/all");
};

export const getOneProduct = (
  id: string
): Promise<AxiosResponse<GetOneProductResponse>> => {
  return axiosInstance.get(`/products/${id}`);
};
