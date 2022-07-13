import { addReview, getProduct, getProductReview, getProducts, getSuggested, sendVote } from "core/api";
import Cookies from "js-cookie";
import { getDataFromStorage, saveDataToStorage } from "util/storage";
import { showToast } from "util/toast";


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
export const fetchProductReview = async (query: any) => {
  try {
    const { status, data } = await getProductReview(query);
    if (status === 200) {
      return data;
    }
  } catch (e) {
    console.log(e);
  }
  return [];
};
export const fetchSuggested = async (query: any) => {
  try {
    const { status, data } = await getSuggested(query);
    if (status === 200) {
      return data;
    }
  } catch (e) {
    console.log(e);
  }
  return [];
};
export const voteApi = async (state:any, query: any) => {
  try {
    const { status, data } = await sendVote(state, query);
    if (status === 200) {
      return 1;
    }
  } catch (e) {
    console.log(e);
  }
  return -1;
};
export const addReviewApi = async (query: any) => {
  try {
    const { status, data } = await addReview(query);
    if (status === 200) {
      console.log(data);
      if (data.message == "You did not bought this product, so you can't add review.") {
        return -2;
      } else if (data.message == "successfully added review to the product.") { 
        return 1;
      }
    }
  } catch (e) {
    console.log(e);
  }
  return -1;
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
    showToast("Product added to cart", "success");
    updateCart();
    // console.log("OC", Cookies.get("DB_CART"));
  } catch (e) {
    console.log(e);
  }
  return [];
};


export const removeFromCart = async (productId: any, storeId:any, updateCart:any) => {
  try {
    const cart = Cookies.get("DB_CART");
    const oldCart = JSON.parse(cart??'{"cart":[]}');
    
    if (oldCart == null) {
      return;
    } else {
      const exists = oldCart.cart.findIndex(function(item:any, i:number){
        return item.product_id === productId && item.store_id == storeId;
      });
      if (exists!=-1) {
        oldCart.cart.splice(exists, 1);
        Cookies.set("DB_CART", JSON.stringify({ cart:[...oldCart.cart] }));
      }
      showToast("Product removed from cart", "success");
    }
    updateCart();
  } catch (e) {
    console.log(e);
  }
  return [];
};