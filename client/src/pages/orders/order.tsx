
import { ProductCard } from 'pages/products/product';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, FlexboxGrid } from 'rsuite';
import { fetchOrder } from './api/orders';
export const Order = () => {
  const navigate = useNavigate();
  const { ID } = useParams();

  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (!ID) return;
    (async () => {
      
      const data = await fetchOrder({order_id:ID});
      setOrderData(data.map((item: any) => {
        return (
          {
            order_id: item[0],
            order_status: item[1],
            // order_id: item[2],
            // order_id: item[3],
            estimate_date: item[4],
            total_price: item[5],
            order_date: item[6],
            // order_id: item[6],
            // order_id: item[7],
            // order_id: item[8],
            // order_id: item[9],
            // order_id: item[10],
            // order_id: item[11],
            count: item[12],
            // order_id: item[13],
            // order_id: item[14],
            // order_id: item[15],
            regular_price: item[15],
            name: item[16],
            picture: item[17],
            weight: item[18],
            color: item[19],
            dimensions: item[20],
            description: item[21],
            store_id: item[22],
            store_name: item[23],
            // store: item[24],
            // store: item[25],
            // sda: item[26],
            discount_percentage: item[30],
          }
        );
        
      }));

    })()
    }, []);
    return (
      <div className="col-12" >
        <div className="page-title-box">
          {ID && orderData.length && <h4 className="page-title">Order #{ID}, {orderData[0]?.order_status}</h4>}
        </div>
        <div className="row product-list mt-4">
          <FlexboxGrid className="mt-4 mb-1 font-18 text-center d-flex" style={{alignItems:"center", justifyContent: "center"}}>
            <FlexboxGrid.Item colspan={6}>Picture</FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>Store Name</FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>Sales Price</FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>Count</FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>Total</FlexboxGrid.Item>
          </FlexboxGrid>
          {orderData.length && orderData.map((item: any) => {
            return (
              <FlexboxGrid key={`${item.id} ${item.store_id}`} className="mt-4 mb-1 font-18 text-center d-flex" style={{alignItems:"center", justifyContent: "center"}}>
              <FlexboxGrid.Item colspan={6}><ProductCard full={true} data={[item.id, "0.0", item.regular_price, item.name, item.picture, item.weight, item.color, item.dimensions, item.description]} /></FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={4}>{item.store_name}</FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={4}>{item.regular_price * (1- item.discount_percentage)}$</FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={4}>{item.count}</FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={4}>{item.count* (item.regular_price * (1- item.discount_percentage))}$</FlexboxGrid.Item>
              </FlexboxGrid>
              
            );
          })
          }
        </div>
        <div className="page-title-box mt-4 mb-5">
          {orderData.length &&
          <>
            <h4 className="page-title">Total: {orderData[0]?.total_price}$</h4>
            <h4 className="page-title">Order Date: {orderData[0]?.order_date}</h4>
            <h4 className="page-title">Estimate Date: {orderData[0]?.estimate_date}</h4>
          </>
          }
        </div>
      </div>
    );

};