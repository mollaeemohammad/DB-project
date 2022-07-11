import { buyProducts } from "core/api";

export const buyProductsApi = async (query: any) => {
  try {
    const { status, data } = await buyProducts(query);
    if (status === 200 && data.message=="Successfully bought product") {
      return 1;
    }
  } catch (e) {
    console.log(e);
  }
  return -1;
};