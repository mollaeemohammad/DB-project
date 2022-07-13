import { getOrders, getOrder } from "core/api";


export const fetchOrders = async (query:any) => {
  try {
    const { status, data } = await getOrders(query);
    if (status === 200) {
      return data;
    }
  } catch (e) {
    console.log(e);
  }
  return [];
};
export const fetchOrder = async (query: any) => {
  try {
    const { status, data } = await getOrder(query);
    if (status === 200) {
      return data;
    }
  } catch (e) {
    console.log(e);
  }
  return [];
};
