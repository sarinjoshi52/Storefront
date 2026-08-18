import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart, getCart } from "../services/cart.services";
import { message } from "antd";
import axios from "axios";

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addToCart"],
    mutationFn: addToCart,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["cartItem"] });
      message.success(res.data.message);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message ?? "Something went wrong!");
      } else {
        message.error("Something went wrong!");
      }
    },
  });
}

export function useGetCart() {
  return useQuery({
    queryKey: ["cartItem"],
    queryFn: getCart,
    enabled: !!localStorage.getItem("accessToken"),
  });
}
