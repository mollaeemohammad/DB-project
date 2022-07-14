import { useEffect, useState } from "react";
import { Button, FlexboxGrid, Rate, Timeline } from "rsuite";
import { useParams } from "react-router-dom";
import { fetchProduct, addProductToCart, addReviewApi, fetchProductReview, voteApi, fetchSuggested } from "../api/products";
import { RatingStars } from "components/rating-stars";
import { useUser } from 'contexts/user';
import { useNavigate } from "react-router-dom";

import { ArrowUp, ArrowDown } from '@rsuite/icons';

import TextField from "components/form/textfield";
import TextAreaField from "components/form/textarea-field";
import Field from "components/form/field";
import { FC, forwardRef, useCallback,  useRef } from "react";
import {  ButtonToolbar, Form, Input, MaskedInput, Modal, Schema, Placeholder } from "rsuite";
import { showToast } from "util/toast";
import Cookies from "js-cookie";
import { ProductCard } from "../product";

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  discussion: StringType().isRequired(),
  rate: NumberType().isRequired(),
});
export const SingleProduct = () => {
  const { NAME } = useParams();
  const { Paragraph } = Placeholder;
  const [products, setProducts] = useState<any>([]);
  const [productData, setProductData] = useState<any>([]);
  const [productReviewData, setProductReviewData] = useState<any>([]);
  const { userTrigger, setUserTrigger } = useUser();

  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>();
  const [formValue, setFormValue] = useState<any>({ rate: 2.5 });
  
  const [avgRate, setAvgRate] = useState<any>(0.0);
  const handleSubmit = useCallback(async () => {
    if (formRef.current && !formRef.current.check()) {
      console.log(formError, 'Form Error');
      return;
    }
    
    console.log(formValue, 'Form Value');

    const res = await addReviewApi({...formValue, product_id:productData[0].id, customer_id:Cookies.get("DB_ID") });
    if (res==1) {
      showToast("Review Added Successfully", "success");
    } else if (res == -2) {
      showToast("You haven't bought this product yet.", "error");
    }
  }, [formValue, productData]);
  
  const updateCart = () => {
    setUserTrigger(!userTrigger);
  };

  const initProductReview = async () => {
    const data = await fetchProductReview({ name: NAME });

    const total = data.reduce(function (sum:any, item:any) {
      return sum + parseFloat(item[12]);
    }, 0);

    if (data.length) {
      setAvgRate(total / data.length);
    }

    const jsonedData = data.map((item: any, index: number) => {
      return ({
        id:item[9],
        discussion:item[11],
        review_rating:item[12],
        upvoates:item[13],
        downvoates:item[14],
        // ...
      });
    });
    setProductReviewData(jsonedData);
  };

  const vote = async (up: any, id: any) => {
    await voteApi(up ? "up" : "down", { review_id: id });
    initProductReview();
  };

  const initSuggestedProducts = async (id:number)=>{
    const data = await fetchSuggested({ product_id: id });
    
    setProducts(data.filter((item: any) => { 
      return item[0] != id;
    }));
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
          location: item[17],
          // item[18],
          // item[19],
          // discussion:item[20],
          // review_rating:item[21],
          // upvoates:item[22],
          // downvoates:item[23],
          // ...
        });
      });
      console.log(jsonedData);
      setProductData(jsonedData);


    await initProductReview();
    await initSuggestedProducts(data[0][0]);



    })();
  }, []);
  return (
    <div className="content-page">
    { productData.length &&
      <div className="content">
        <div className="row">
          <div className="col-12 mb-3">
            <div className="page-title-box">
              <h4 className="page-title">Product overview</h4>
            </div>
          </div>
          <div className="col-12 col-md-7">
            <h2>{productData[0].name}</h2>
            <div className="mt-2"><Rate defaultValue={avgRate} readOnly allowHalf />{avgRate}</div>
            <p className="mt-3 font-20" style={{minHeight:100}}>{productData[0].description}</p>
            <div className="font-20 mb-2">Available on:</div>
            <FlexboxGrid className=" mb-1 font-18 text-center d-flex" style={{alignItems:"center", justifyContent: "center"}}>
              <FlexboxGrid.Item colspan={6}>Store Name</FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={6}>Regular Price</FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={6}>Sales Price</FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={6}>Action</FlexboxGrid.Item>
            </FlexboxGrid>
            {productData.map((item: any, index: number) => {
              return (<FlexboxGrid key={`${item.id} ${item.store_id}`} className=" font-18 text-center d-flex" style={{alignItems:"center", justifyContent: "center"}}>
                <FlexboxGrid.Item colspan={6}>{item.store_name}</FlexboxGrid.Item>
                <FlexboxGrid.Item className="p-1" colspan={6}>{item.store_discount ? <s>{productData[0].price}</s> : productData[0].price} $</FlexboxGrid.Item>
                <FlexboxGrid.Item className="p-1" colspan={6}>{productData[0].price * (1 - item.store_discount)} $</FlexboxGrid.Item>
                <FlexboxGrid.Item className="p-1" colspan={6}><Button onClick={() => { addProductToCart({ product_id: item.id, store_id: item.store_id, count: 1, discount_percentage: item.store_discount, price: item.price,name:item.name, store_name:item.store_name, picture:item.picture }, updateCart); }} appearance="default">Add to cart</Button></FlexboxGrid.Item>
              </FlexboxGrid>);
            })}
            
          </div>
          <div className="col-12 col-md-5">
            <div className="pos-relative">
              <div style={{borderRadius:100, width:20, height:20, backgroundColor:productData[0].color, position:"absolute", top:70, right:50}} ></div>
              <img src={productData[0].picture} alt="" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-2 mb-3">
            <h3>Product reviews:</h3>
          </div>
          <Form ref={formRef} onChange={setFormValue} onCheck={setFormError} formError={formError} model={model} formDefaultValue={formValue} style={{ margin: "auto"}}>
              <div className="show-grid mb-4">
                <FlexboxGrid>
                  <FlexboxGrid.Item colspan={14} style={{ paddingRight: 10 }}>
                    <Field accepter={Rate} defaultValue={2.5} allowHalf
                      name="rate" label="Your Rate" />
                    <TextAreaField rows={5} name="discussion" label="Description" />
                    <ButtonToolbar style={{ marginTop:"20px", float: "right" }}>
                      <Button  appearance="default" type="submit" onClick={handleSubmit}>Submit Review</Button>
                    </ButtonToolbar>
                  </FlexboxGrid.Item>
                  {productReviewData &&
                    <FlexboxGrid.Item colspan={14} style={{ paddingRight: 10 }}>
                      <Timeline align="left" className="font-22">
                    {productReviewData.map((item: any, index: number) => {
                      return (
                        <Timeline.Item key={item.id}>
                          <p className="mb-0">{item.discussion}</p>
                          <p className="mt-0 font-16"><Rate size="xs" defaultValue={item.review_rating} readOnly allowHalf /> {item.upvoates}<ArrowUp onClick={() => { vote(1,item.id) }} style={{ color: "var(--toastify-color-success)", fontSize: 22 }} /> {item.downvoates}<ArrowDown onClick={() => { vote(0,item.id) }} style={{color:"var(--toastify-color-error)", fontSize:22}} /></p>
                        </Timeline.Item>
                      );
                    })
                  }
                  </Timeline>
                  </FlexboxGrid.Item>}
                  
                </FlexboxGrid>
              </div>

            
            </Form>
        </div>
          
        <div className="row">
          <div className="col-12 mt-3 mb-3">
            <h3>Suggested Products:</h3>
          </div>
          <div className="col-12">
            <div className="row product-list">
              {products.map((product: any) => {
                return (
                  <ProductCard key={product[0]} data={product} />
                );
              })}
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};