import { API } from ".";

export const getDataCategories = async () => {
  return (await API.get(`/data/categories`)).data;
};

export const getDataFiles = async () => {
  return (await API.get(`/data/files`)).data;
};
