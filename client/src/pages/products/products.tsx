import { FC, useEffect, useState } from "react";

import { Gear, Search} from '@rsuite/icons';

import "./products.css";
import { Input, InputGroup, Loader } from "rsuite";
import { fetchProducts } from "./api/products";
import { ProductCard } from "./product";

import debounce from "lodash.debounce";
const debouncedFetchData = debounce((func,query) => {
  func(query);
}, 1000);

const Products = () => {

  const [products, setProducts] = useState<any>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const initProducts = async (search:string) => {
    setLoadingProducts(true);
    const data = await fetchProducts(search);
    setProducts(data);
    setLoadingProducts(false);
  };

  useEffect (() => {
    (async () => {
      initProducts("");
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

          <InputGroup size="md" inside>
              <Input placeholder={"Search..."} onChange={(val: string) => { debouncedFetchData(initProducts, val); }} />
            <InputGroup.Button>
              <Search />
            </InputGroup.Button>
          </InputGroup>
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


