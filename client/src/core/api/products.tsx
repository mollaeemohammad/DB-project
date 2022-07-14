import { appNetworkManager } from "./network-manager";
import { addProductModel } from "models";

const ADD_PRODUCT_URL = `/api/add_new_product`;
export const addProduct = (params:addProductModel ) => {
  console.log("addProduct: ", ADD_PRODUCT_URL);
  return appNetworkManager.post(ADD_PRODUCT_URL, params);
};

const GET_PRODUCTS_URL =(search:string, min_weight:number, max_weight:number, min_price:number, max_price:number, color:string)=> `/api/filter_products?name=${search}&min_weight=${min_weight}&max_weight=${max_weight}&min_price=${min_price}&max_price=${max_price}&color=${color}`;
export const getProducts = (search:string, min_weight:number, max_weight:number, min_price:number, max_price:number, color:string) => {
  console.log("getProducts: ", GET_PRODUCTS_URL(search, min_weight, max_weight, min_price, max_price, color));
  return appNetworkManager.get(GET_PRODUCTS_URL(search, min_weight, max_weight, min_price, max_price, color));
};
const GET_SUGGESTED_URL = `/api/suggestion`;
export const getSuggested = (search:string) => {
  console.log("getSuggested: ", GET_SUGGESTED_URL);
  return appNetworkManager.post(GET_SUGGESTED_URL, search);
};

const GET_PRODUCT_URL = `/api/choose_product`;
export const getProduct = (params:any) => {
  console.log("getProduct: ", GET_PRODUCT_URL);
  return appNetworkManager.post(GET_PRODUCT_URL, params);
};
const GET_PRODUCT_REVIEW_URL = `/api/choose_product_review`;
export const getProductReview = (params:any) => {
  console.log("getProductReview: ", GET_PRODUCT_REVIEW_URL);
  return appNetworkManager.post(GET_PRODUCT_REVIEW_URL, params);
};

const BUY_PRODUCTS_URL = `/api/buy`;
export const buyProducts = (params:any) => {
  console.log("buyProducts: ", BUY_PRODUCTS_URL);
  return appNetworkManager.post(BUY_PRODUCTS_URL, params);
};
const ADD_REVIEW_URL = `/api/add_review`;
export const addReview = (params:any) => {
  console.log("addReview: ", ADD_REVIEW_URL);
  return appNetworkManager.post(ADD_REVIEW_URL, params);
};
const ADD_VOTE_URL =(state:any)=> `/api/${state}_vote`;
export const sendVote = (state:any, params:any) => {
  console.log("sendVote: ", ADD_VOTE_URL(state));
  return appNetworkManager.post(ADD_VOTE_URL(state), params);
};