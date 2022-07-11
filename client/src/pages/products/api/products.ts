import { getProduct, getProducts } from "core/api";
import Cookies from "js-cookie";
import { getDataFromStorage, saveDataToStorage } from "util/storage";


export const fetchProducts = async (search = "") => {
  try {
    const { status, data } = await getProducts(search);
    if (status === 200) {
      return data;
    }
  } catch (e) {
    console.log(e);
  }
  return [];
};
export const fetchProduct = async (query: any) => {
  try {
    const { status, data } = await getProduct(query);
    if (status === 200) {
      return data;
    }
  } catch (e) {
    console.log(e);
  }
  return [];
};
export const addProductToCart = async (query: any, updateCart:any) => {
  // [product_id, store_id, count, discount_percentage, price]

  console.log(query);
  try {
    const cart = Cookies.get("DB_CART");
    const oldCart = JSON.parse(cart??'{"cart":[]}');
    
    if (oldCart == null) {
      // no cookie set
      Cookies.set("DB_CART", JSON.stringify({ cart:[query] }));
    } else {
      const exists = oldCart.cart.findIndex(function(item:any, i:number){
        return item.product_id === query.product_id && item.store_id == query.store_id;
      });
      if (exists!=-1) {
        let item = oldCart.cart[exists];
        oldCart.cart.splice(exists, 1);
        item = { ...item, count: item.count + 1 };
        Cookies.set("DB_CART", JSON.stringify({ cart:[...oldCart.cart, item] }));
        console.log("add count", item)
      } else {
        Cookies.set("DB_CART", JSON.stringify({ cart:[...oldCart.cart, query] }));
      }
      
    }
    updateCart();
    // console.log("OC", Cookies.get("DB_CART"));
  } catch (e) {
    console.log(e);
  }
  return [];
};