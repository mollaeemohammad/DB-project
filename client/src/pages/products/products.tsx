import { FC, useEffect, useState, useCallback } from "react";

import { Gear, Search} from '@rsuite/icons';

import "./products.css";
import { Input, InputGroup, Loader, RangeSlider, InputNumber, SelectPicker } from "rsuite";
import { fetchProducts } from "./api/products";
import { ProductCard } from "./product";

import debounce from "lodash.debounce";
import { COLORS } from "util/storage";
const debouncedFetchData = debounce((func,query) => {
  func(...query);
}, 1000);

const Products = () => {

  const [products, setProducts] = useState<any>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  
  const [theSearch, setTheSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999999);
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(999999);
  const [theColor, setTheColor] = useState("");

  const initProducts = useCallback(async (temp="") => {
    temp;
    setLoadingProducts(true);
    const data = await fetchProducts(theSearch, minWeight, maxWeight, minPrice, maxPrice, theColor);
    setProducts(data);
    setLoadingProducts(false);
  },[theSearch, minWeight, maxWeight ,minPrice, maxPrice, theColor]);

  useEffect(() => { 
    debouncedFetchData(initProducts, "");
  },[theSearch, minWeight, maxWeight ,minPrice, maxPrice, theColor])


  useEffect (() => {
    (async () => {
      // filter_products?name=&min_weight=0&max_weight=999&min_price=13&max_price=100000&color=
      // initProducts();
    })();
  },[]);

  return (
    <div className="content-page">
      <div className="content">
        <div className="row">
          <div className="col-12 mb-3">
            <div className="page-title-box">
              <h4 className="page-title">Products</h4>
            </div>
          </div>
          <div className="col-6 mb-4">

            <label className="mb-1 mt-3">Search:</label>
            <InputGroup size="md" inside>
              <Input placeholder={"Search..."} onChange={(val:any)=>{setTheSearch(val)}} />
              <InputGroup.Button>
                <Search />
              </InputGroup.Button>
            </InputGroup>

            <label className="mb-1 mt-3">Price rage:</label>
            <InputGroup>
              <InputNumber
                min={0}
                max={99999}
                onChange={(val: any) => { setMinPrice(val) }}
              />
              <InputGroup.Addon>to</InputGroup.Addon>
              <InputNumber
                min={0}
                max={99999}
                onChange={(val: any) => { setMaxPrice(val) }}
              />
            </InputGroup>
          </div>
          <div className="col-6 mb-4">
            <label className="mb-1 mt-3">Wright rage:</label>
            <InputGroup>
              <InputNumber
                min={0}
                max={99999}
                onChange={(val: any) => { setMinWeight(val) }}
              />
              <InputGroup.Addon>to</InputGroup.Addon>
              <InputNumber
                min={0}
                max={99999}
                onChange={(val: any) => { setMaxWeight(val) }}
              />
            </InputGroup>
            <label className="mb-1 mt-3">Color:</label>
                
            <SelectPicker block data={[{label:"All", value:""} , ...COLORS]} onChange={(val: any) => { setTheColor(val) }} renderMenuItem={(label:any, item:any) => {
              return (
                <div>
                  <div className="d-flex" style={{alignItems:"center"}}><span style={{width:15, height:15, borderRadius:100, background:`${label}`, display:"inline-block", marginRight:10}} /> {label}</div>
                </div>
              );
            }} />
          </div>
            

            

          {!loadingProducts && <div className="col-12">
            <div className="row product-list">
              {products.map((product: any) => {
                return (
                  <ProductCard key={product[0]} data={product} />
                );
              })}
            </div>
          </div>}
          {loadingProducts && <div style={{ width: "100vw", height: "100vh", position: "relative", margin: "auto" }}>
            <Loader style={{ position: "absolute", left: "50%", top: "50%", transform: "translateX(-50%) translateY(-50%)" }} size="lg" content="" />
          </div>}
        </div>
      </div>
      
    </div>);
};

export default Products;


