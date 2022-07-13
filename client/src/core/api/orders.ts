import { appNetworkManager } from "./network-manager";

const GET_ORDERS_URL = `/api/all_orders_of_customer`;
export const getOrders = (query:string) => {
  console.log("getOrders: ", GET_ORDERS_URL);
  return appNetworkManager.post(GET_ORDERS_URL, query);
};
const GET_ORDER_URL = `/api/choose_order`;
export const getOrder = (query:string) => {
  console.log("getOrder: ", GET_ORDER_URL);
  return appNetworkManager.post(GET_ORDER_URL, query);
};
