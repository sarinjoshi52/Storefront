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
    mutationKey: ["updateCart"],

    mutationFn: (data: updateCartDTO) => updateCart(data),

    onMutate: async ({ productId, change }) => {
      // Cancel an ongoing cart request
      await queryClient.cancelQueries({
        queryKey: ["cartItem"],
      });

      // Save the current cart as a backup
      const previousCart = queryClient.getQueryData(["cartItem"]);

      // Optimistically update the cache
      queryClient.setQueryData(["cartItem"], (oldData: any) => {
        console.log(oldData);
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: {
            ...oldData.data,
            cart: {
              ...oldData.data.cart,
              items: oldData.data.cart.items.map((item: any) => {
                if (item.productId._id === productId) {
                  return {
                    ...item,
                    quantity: item.quantity + change,
                  };
                }

                return item;
              }),
            },
          },
        };
      });

      // This gets passed to onError
      return { previousCart };
    },

    onError: (error, _variables, context) => {
      // Rollback
      if (context?.previousCart) {
        queryClient.setQueryData(["cartItem"], context.previousCart);
      }

      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message ?? "Something went wrong!");
      } else {
        message.error("Something went wrong");
      }
    },

    onSettled: () => {
      // Synchronize with backend
      queryClient.invalidateQueries({
        queryKey: ["cartItem"],
      });
    },
  });
}
