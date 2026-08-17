import { useQuery } from "@tanstack/react-query";
import { getOneProduct, getProduct } from "../services/product.services";

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
  });
}

export function useGetOneProduct(id?: string) {
  return useQuery({
    queryKey: ["OneProduct", id],
    queryFn: () => getOneProduct(id),
    enabled: !!id,
  });
}
