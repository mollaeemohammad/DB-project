import { FC, useEffect, useState } from "react";

import {useNavigate} from "react-router-dom";

import { Footer } from "components/ui/footer";
import { Header } from "components/ui/header";
import { Sidebar } from "components/ui/sidebar";


import { ButtonGroup, Input, InputGroup, ButtonToolbar, Button } from "rsuite";
import { fetchCategories } from "./api/categories";

const Categories: FC = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await fetchCategories();
      setCategories(data);
    })();
  }, []);
  return (
   <div className="content-page">
      <div className="content">
        <div className="row">
          <div className="col-12 mb-3">
            <div className="page-title-box">
              <h4 className="page-title">Categories</h4>
            </div>
            <ButtonToolbar className="mt-3">
              <ButtonGroup>
              {categories.map((item: any) => {
                return (<Button key={item[0]} onClick={()=>{navigate(`/category/${item[0]}`)}} appearance="default">{item[1]}</Button>);
              })}
              </ButtonGroup>
            </ButtonToolbar>
          </div>

        </div>
      </div>
      
    </div>);
};

export default Categories;