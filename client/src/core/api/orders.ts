import { appNetworkManager } from "./network-manager";

const GET_ORDERS_URL = `/api/all_orders_of_customer`;
export const getOrders = (query:string) => {
  console.log("getOrders: ", GET_ORDERS_URL);
  return appNetworkManager.post(GET_ORDERS_URL, query);
};
const GET_DELIVERIES_URL = `/api/all_deliveries`;
export const getDeliveries = (query:string) => {
  console.log("getDeliveries: ", GET_DELIVERIES_URL);
  return appNetworkManager.post(GET_DELIVERIES_URL, query);
};
const GET_ORDER_URL = `/api/choose_order`;
export const getOrder = (query:string) => {
  console.log("getOrder: ", GET_ORDER_URL);
  return appNetworkManager.post(GET_ORDER_URL, query);
};
const GET_Problems_URL = `/api/all_problems_of_order`;
export const getProblems = (query:string) => {
  console.log("getProblems: ", GET_Problems_URL);
  return appNetworkManager.post(GET_Problems_URL, query);
};
const ADD_PROBLEM_URL = `/api/add_problem`;
export const addProblem = (query:string) => {
  console.log("addProblem: ", ADD_PROBLEM_URL);
  return appNetworkManager.post(ADD_PROBLEM_URL, query);
};
