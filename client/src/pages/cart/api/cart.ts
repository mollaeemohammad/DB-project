import { buyProducts } from "core/api";

export const buyProductsApi = async (query: any) => {
  try {
    const { status, data } = await buyProducts(query);
    if (status === 200) {
      return data;
    }
  } catch (e) {
    console.log(e);
  }
  return [];
};