/* eslint-disable @typescript-eslint/no-explicit-any */
import { API } from ".";

export const loginUser = async (email: string, password: string) => {
  return (await API.post("/auth/login", { email, password })).data;
};

export const registerUser = async (data: any) => {
  return (await API.post("/auth/signup", data)).data;
};

export const changePassword = async (data: any) => {
  return (
    await API.post("/auth/change-password", {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    })
  ).data;
};

export const sendPasswordResetMail = async (data: any) => {
  return (await API.post("/auth/reset-password-mail", data)).data;
};

export const resetPassword = async (token: string, data: any) => {
  return (await API.post(`/auth/reset-password/${token}`, data)).data;
};

export const logoutUser = async () => {
  return await API.post(`/auth/logout`);
};
