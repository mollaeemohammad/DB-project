import { useEffect, useState } from "react";
import { Button, FlexboxGrid } from "rsuite";
import { useParams } from "react-router-dom";
import { fetchProduct, addProductToCart } from "../api/products";
import { RatingStars } from "components/rating-stars";
import { useUser } from 'contexts/user';


export const SingleProduct = () => {
  const { NAME } = useParams();
  const [productData, setProductData] = useState<any>();
  const { userTrigger, setUserTrigger } = useUser();

  const updateCart = ()=>{
    setUserTrigger(!userTrigger);

  }
  useEffect(() => {
    (async () => {
      if (!NAME) return;
      const data = await fetchProduct({ name: NAME });
      console.log(data);
      const jsonedData = data.map((item: any, index: number) => {
        return ({
          id: item[0],
          rating: item[1],
          price: item[2],
          name: item[3],
          picture: item[4],
          weight: item[5],
          color: item[6],
          dimensions: item[7],
          description: item[8],

          store_id: item[9],
          // item[10],
          // item[11],
          store_date:item[12],
          store_discount:parseFloat(item[13]),
          // item[14],
          store_name: item[15],
          // item[16],
          location: item[12],
          // ...
        });
      });
      console.log(jsonedData);
      setProductData(jsonedData);




    })();
  }, []);
  return (
    <div className="content-page">
    { productData &&
      <div className="content">
        <div className="row">
          <div className="col-12 mb-3">
            <div className="page-title-box">
              <h4 className="page-title">Product overview</h4>
            </div>
          </div>
          <div className="col-12 col-md-7">
            <h2>{productData[0].name}</h2>
            <div className="mt-2"><RatingStars stars={`${parseInt(productData[0].rating)}` } />{ productData[0].rating }</div>
            <p className="mt-3 font-20" style={{minHeight:100}}>{productData[0].description}</p>
            <div className="font-20 mb-2">Available on:</div>
            <FlexboxGrid className=" mb-1 font-18 text-center d-flex" style={{alignItems:"center", justifyContent: "center"}}>
              <FlexboxGrid.Item colspan={6}>Store Name</FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={6}>Regular Price</FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={6}>Sales Price</FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={6}>Action</FlexboxGrid.Item>
            </FlexboxGrid>
            {productData.map((item: any, index: number) => {
              return (<FlexboxGrid key={item.store_id} className=" font-18 text-center d-flex" style={{alignItems:"center", justifyContent: "center"}}>
                <FlexboxGrid.Item colspan={6}>{item.store_name}</FlexboxGrid.Item>
                <FlexboxGrid.Item className="p-1" colspan={6}>{item.store_discount ? <s>{productData[0].price}</s> : productData[0].price} $</FlexboxGrid.Item>
                <FlexboxGrid.Item className="p-1" colspan={6}>{productData[0].price * (1 - item.store_discount)} $</FlexboxGrid.Item>
                <FlexboxGrid.Item className="p-1" colspan={6}><Button onClick={() => { addProductToCart({ product_id: item.id, store_id: item.store_id, count: 1, discount_percentage: item.store_discount, price: item.price,name:item.name, store_name:item.store_name, picture:item.picture }, updateCart); }} appearance="default">Add to cart</Button></FlexboxGrid.Item>
              </FlexboxGrid>);
            })}
            
          </div>
          <div className="col-12 col-md-5">
            <div>
              <img src={productData[0].picture} alt="" />
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};