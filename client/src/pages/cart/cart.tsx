import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Button, FlexboxGrid } from "rsuite";

export const Cart = () => {
  const [cartData, setCartData] = useState<any>()
  const initCart = () => {
    const cart = JSON.parse(Cookies.get("DB_CART")??'{"cart":[]}');
    setCartData(cart.cart);
  }
  useEffect(() => {
    initCart();
  }, []);
  return (
    <div className="content-page">
      <div className="content">
        <div className="row">
          <div className="col-12 mb-3">
            <div className="page-title-box">
              <h4 className="page-title">Cart</h4>
            </div>

            <div className="col-12">
              <FlexboxGrid className=" mb-1 font-18 text-center d-flex" style={{alignItems:"center", justifyContent: "center"}}>
                <FlexboxGrid.Item colspan={4}>Picture</FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={4}>Name</FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={4}>Sales Price</FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={4}>Count</FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={4}>Store Name</FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={4}>Remove</FlexboxGrid.Item>
              </FlexboxGrid>
              {
                cartData && cartData.map((item: any) => {
                  return (<FlexboxGrid key={item.id} className=" mb-1 font-18 text-center d-flex" style={{ alignItems: "center", justifyContent: "center" }}>
                    <FlexboxGrid.Item colspan={4}><img src={item.picture} /></FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4}>{item.name}</FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4}>{item.price*(1-item.discount_percentage)}</FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4}>{item.count}</FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4}>{item.store_name}</FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4}><Button appearance="default">Remove From Cart</Button></FlexboxGrid.Item>
                  </FlexboxGrid>);
                })
              }

            </div>
          </div>
        </div>
      </div>
    </div>);
};

export default Cart;