import { appNetworkManager } from "./network-manager";
import { addCategoryModel } from "models";

const GET_CATEGORIES_URL = `/api/all_categories`;
export const getCategories = () => {
  console.log("getCategories: ", GET_CATEGORIES_URL);
  return appNetworkManager.get(GET_CATEGORIES_URL);
};

const ADD_CATEGORY_URL = `/api/add_new_category`;
export const addCategory = (params:addCategoryModel) => {
  console.log("addCategory: ", ADD_CATEGORY_URL);
  return appNetworkManager.post(ADD_CATEGORY_URL, params);
};

const GET_CATEGORY_URL = `/api/all_products_of_category`;
export const getCategory = (params:addCategoryModel) => {
  console.log("getCategory: ", GET_CATEGORY_URL);
  return appNetworkManager.post(GET_CATEGORY_URL, params);
};

