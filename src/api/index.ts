/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

API.interceptors.response.use(
  (response: any) => response, // Directly return successful responses.
  async (error: any) => {
    const originalRequest: any = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url !== "/auth/login" &&
      !originalRequest._retry
    ) {
      console.log({ error });
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        // Make a request to server to refresh the token.

        await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
          },
        );

        return API(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError: any) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error("Token refresh failed:", refreshError);
        // localStorage.removeItem("accessToken");

        if (window.location.pathname !== "/login") {
          window.location.replace("/login");
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  },
);
