/* eslint-disable @typescript-eslint/no-explicit-any */
import { API } from ".";

export const getMessages = async (readStatus: "read" | "unread") => {
  return (await API.get(`/messages?readStatus=${readStatus}`)).data;
};

export const getMessagesCount = async () => {
  return (await API.get(`/messages/count`)).data;
};

export const sendMessage = async (data: any) => {
  return (await API.post(`/messages`, data)).data;
};

export const updateMessage = async (data: any) => {
  return (await API.patch(`/messages/${data.id}`, data)).data;
};
