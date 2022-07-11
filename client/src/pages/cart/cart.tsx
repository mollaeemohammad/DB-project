import { useUser } from "contexts/user";
import Cookies from "js-cookie";
import { removeFromCart } from "pages/products/api/products";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, FlexboxGrid } from "rsuite";
import { isAdmin, isStore } from "util/helper";
import { showToast } from './../../util/toast';
import { buyProductsApi } from "./api/cart";

export const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState<any>();
  const [cartTotal, setCartTotal] = useState<any>(0.00);
  const [admin, setAdmin] = useState(isAdmin());
  const [store, setStore] = useState(isStore());
  const { userTrigger, setUserTrigger } = useUser();

  const updateCart = () => {
    setUserTrigger(!userTrigger);
  };
  const handleBuy = async() => {
    const customerId = Cookies.get("DB_ID");
    if (!customerId) {
      showToast("Please login to buy products", "error");
      return;
    }
    const newData = cartData.map((item: any) => { 
      return [item.product_id, item.store_id, item.count, item.discount_percentage, parseFloat(item.price)];
    })
    const res = await buyProductsApi({
      customer_id: Cookies.get("DB_ID"),
      cart: newData,
      // discount_code:""
    });
    if (res == 1) {
      showToast("Products bought successfully", "success");
      Cookies.set("DB_CART", '{"cart":[]}');
      updateCart()
      // navigate("/orders");
      return;
    }
    showToast("Something went wrong!", "error");
  };
  // 
  
  const initCart = () => {
    const cart = JSON.parse(Cookies.get("DB_CART") ?? '{"cart":[]}');
    setCartData(cart.cart);
    // cart.cart.reduce()
    const total = cart.cart.reduce(function (sum:any, item:any) {
      return sum + (item.count * item.price * (1-item.discount_percentage));
    }, 0);
    setCartTotal(total);
  };

  
  useEffect(() => {
    initCart();
  }, [userTrigger]);
  return (
    <div className="content-page">
      <div className="content">
        <div className="row">
          <div className="col-12 mb-3">
            <div className="page-title-box">
              <h4 className="page-title">Cart</h4>
            </div>

            <div className="col-12">
              <FlexboxGrid className="mt-4 mb-1 font-18 text-center d-flex" style={{alignItems:"center", justifyContent: "center"}}>
                <FlexboxGrid.Item colspan={4}>Picture</FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={4}>Name</FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={4}>Sales Price</FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={4}>Count</FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={4}>Store Name</FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={4}>Remove</FlexboxGrid.Item>
              </FlexboxGrid>
              <Divider />
              {
                cartData && cartData.map((item: any) => {
                  return (<FlexboxGrid key={`${item.product_id}${item.store_id}`} className=" mb-1 font-18 text-center d-flex" style={{ alignItems: "center", justifyContent: "center" }}>
                    <FlexboxGrid.Item colspan={4} onClick={() => { navigate(`/product/${item.name}`)}}><img src={item.picture} /></FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4}>{item.name}</FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4}>{item.price*(1-item.discount_percentage)}$</FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4}>{item.count}</FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4}>{item.store_name}</FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4}><Button appearance="default" onClick={() => { removeFromCart(item.product_id, item.store_id, updateCart);}}>Remove From Cart</Button></FlexboxGrid.Item>
                  </FlexboxGrid>);
                })
              }
                  <Divider />
              {
                <FlexboxGrid className="mt-5 mb-1 font-22 text-center d-flex" style={{ alignItems: "center" }}>
                  <FlexboxGrid.Item colspan={12}>Total: {cartTotal}$</FlexboxGrid.Item>
                  {(!admin && !store) && < FlexboxGrid.Item colspan={12}><Button size="lg" appearance="default" onClick={handleBuy} >Order</Button></FlexboxGrid.Item>}
                </FlexboxGrid>
              }

            </div>
          </div>
        </div>
      </div>
    </div>);
};

export default Cart;