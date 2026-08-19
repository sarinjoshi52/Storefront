import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../services/cart.services";
import { message } from "antd";
import axios from "axios";
import type { updateCartDTO } from "../types/cart.type";

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

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["removeFromCart"],
    mutationFn: (productId: string) => removeFromCart(productId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["cartItem"] });
      message.success(res.data.message);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message ?? "Something went wrong");
      } else {
        message.error("Something went wrong!");
      }
    },
  });
}

export function useUpdateCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateCard"],
    mutationFn: (data: updateCartDTO) => updateCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItem"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message ?? "Something went wrong!");
      } else {
        message.error("Something went wrong");
      }
    },
  });
}
