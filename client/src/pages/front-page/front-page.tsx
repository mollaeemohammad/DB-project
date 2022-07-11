import { FC, useState } from "react";

import {Outlet} from "react-router-dom";

import { Footer } from "components/ui/footer";
import { Header } from "components/ui/header";
import { Sidebar } from "components/ui/sidebar";

const FrontPage: FC = () => {
  const [expanded, setExpanded] = useState(true);
  return (<>
  <Header />
  <div className="container-fluid">
    <div className="row container-wrapper" >
      <div className={`${expanded?'col-lg-3':'col-lg-1'} col-3 fixed-right`}>
        <Sidebar expanded={expanded} setExpanded={setExpanded} />
      </div>

      <div className={`${expanded?'col-lg-9':'col-lg-11'} col-9`} style={{minHeight:"100vh"}}>
        <Outlet />
      </div>
      
    </div>
  </div>
  <Footer/>
  </>);
};

export default FrontPage;