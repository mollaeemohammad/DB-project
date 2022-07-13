
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'rsuite';
import { fetchOrders } from './api/orders';
import { OrderCard } from './order-card';
import { FlexboxGrid } from 'rsuite';
import { Divider } from 'rsuite';
export const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const initOrders = async () => {
    const data = await fetchOrders({ customer_id: Cookies.get("DB_ID") });
    console.log(data, 'data');
    const newData = data.map((item: any) => {
      return (
        {
          id: item[0],
          status: item[1],
          customer_id: item[2],
          receipt_date: item[3],
          estimate_date: item[4],
          total_cost: item[5],
          order_date: item[6],
          discount_percent: item[7],
          delivery_cost: item[8],
        }
      );
    });
    console.log(newData)
    setOrders(newData);
  };
  useEffect(() => {
    initOrders();
  }, []);

  return (
    <div className="content-page">
      <div className="content">
        <div className="row">
          <div className="col-12 mb-3">
            <div className="page-title-box">
              <h4 className="page-title">Orders</h4>
            </div>
            <div className="col-12">
            <FlexboxGrid className="mt-4 mb-1 font-18 text-center d-flex" style={{alignItems:"center", justifyContent: "center"}}>
              <FlexboxGrid.Item colspan={4}>Order Number</FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={4}>Status</FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={4}>Order Date</FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={4}>Estimate Date</FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={4}>Total Cost</FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={4}>Action</FlexboxGrid.Item>
              </FlexboxGrid>
              <Divider />
              {orders.map((item: any) => { 
                return (<OrderCard key={item.id} data={item} />)
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};