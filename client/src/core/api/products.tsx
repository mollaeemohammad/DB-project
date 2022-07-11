import { appNetworkManager } from "./network-manager";
import { addProductModel } from "models";

const ADD_PRODUCT_URL = `/api/add_new_product`;
export const addProduct = (params:addProductModel ) => {
  console.log("addProduct: ", ADD_PRODUCT_URL);
  return appNetworkManager.post(ADD_PRODUCT_URL, params);
};

const GET_PRODUCTS_URL = `/api/search_in_products`;
export const getProducts = (search:string) => {
  console.log("getProducts: ", GET_PRODUCTS_URL);
  return appNetworkManager.post(GET_PRODUCTS_URL, {name:search});
};

const GET_PRODUCT_URL = `/api/choose_product`;
export const getProduct = (params:any) => {
  console.log("getProduct: ", GET_PRODUCT_URL);
  return appNetworkManager.post(GET_PRODUCT_URL, params);
};

const BUY_PRODUCTS_URL = `/api/buy`;
export const buyProducts = (params:any) => {
  console.log("buyProducts: ", BUY_PRODUCTS_URL);
  return appNetworkManager.post(BUY_PRODUCTS_URL, params);
};