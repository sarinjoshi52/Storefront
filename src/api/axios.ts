import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

const refreshInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // No request config -> nothing to retry
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Only handle 401
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Never retry the same request twice
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // IMPORTANT:
    // If there is no access token, don't even attempt refresh.
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      localStorage.removeItem("accessToken");

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const response = await refreshInstance.post("/auth/storefront/refresh");

      const newAccessToken = response.data.accessToken;

      if (!newAccessToken) {
        throw new Error("No access token returned from refresh");
      }

      localStorage.setItem("accessToken", newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // Refresh token is invalid/expired/revoked
      localStorage.removeItem("accessToken");
      return Promise.reject(refreshError);
    }
  }
);
