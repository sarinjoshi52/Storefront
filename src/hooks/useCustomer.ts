import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/customer.services";

export function useGetMe() {
  return useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
    enabled: !!localStorage.getItem("accessToken"),
  });
}
