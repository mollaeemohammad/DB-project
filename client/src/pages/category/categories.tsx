import { FC } from "react";

import {Outlet} from "react-router-dom";

import { Footer } from "components/ui/footer";
import { Header } from "components/ui/header";
import { Sidebar } from "components/ui/sidebar";

import { Gear} from '@rsuite/icons';

import "./products.css";
import { Input, InputGroup } from "rsuite";

const Categories: FC = () => {
  return (
   <div className="content-page">
      <div className="content">
        <div className="row">
          <div className="col-12 mb-3">
            <div className="page-title-box">
              <h4 className="page-title">Categories</h4>
            </div>
            
          </div>

        </div>
      </div>
      
    </div>);
};

export default Categories;