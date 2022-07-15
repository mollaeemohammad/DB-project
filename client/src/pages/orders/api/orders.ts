import { getOrders, getOrder, getDeliveries, addProblem, getProblems, updateStatus } from "core/api";


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
export const fetchDeliveries = async (query:any) => {
  try {
    const { status, data } = await getDeliveries(query);
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
export const fetchProblems = async (query: any) => {
  try {
    const { status, data } = await getProblems(query);
    if (status === 200) {
      return data;
    }
  } catch (e) {
    console.log(e);
  }
  return [];
};
export const addProblemApi = async (query: any) => {
  try {
    const { status, data } = await addProblem(query);
    if (status === 200 && data.message=="Successfully added the problem.") {
      return 1;
    }
  } catch (e) {
    console.log(e);
  }
  return -1;
};
export const updateStatusApi = async (query: any) => {
  try {
    const { status, data } = await updateStatus(query);
    if (status === 200) {
      return 1;
    }
  } catch (e) {
    console.log(e);
  }
  return -1;
};
