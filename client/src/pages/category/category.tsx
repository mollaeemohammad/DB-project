import { useEffect, useState } from "react";


import { Loader } from "rsuite";

import debounce from "lodash.debounce";
import { fetchCategory } from "./api/categories";
import { ProductCard } from "pages/products/product";
import { useParams } from "react-router-dom";

const Products = () => {
  const { NAME } = useParams();

  const [products, setProducts] = useState<any>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const initProducts = async (name:string) => {
    setLoadingProducts(true);
    const data = await fetchCategory({category_name:name});
    setProducts(data);
    setLoadingProducts(false);
  };

  useEffect (() => {
    (async () => {
      if (!NAME) return;
      initProducts(NAME);
    })();
  },[NAME]);

  return (
    <div className="content-page">
      <div className="content">
        <div className="row">
          <div className="col-12 mb-3">
            <div className="page-title-box">
              <h4 className="page-title">Products of category { NAME }</h4>
            </div>
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


