
import { useCallback, useState, FC, useEffect } from 'react';

import { Sidenav, Nav, Dropdown } from 'rsuite';

import { Gear, Plus} from '@rsuite/icons';

import { useNavigate } from "react-router-dom";
import { isAdmin, isStore } from 'util/helper';
import { fetchCategories } from 'pages/category/api/categories';

interface Props {
  expanded: boolean,
  setExpanded: (expanded: boolean) => void,
}

const Sidebar:FC<Props> = ({expanded, setExpanded}) => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(isAdmin());
  const [store, setStore] = useState(isStore());
  const [categories, setCategories] = useState([]);

  const [activeKey, setActiveKey] = useState<string|undefined>("");

  const handleSelect = useCallback((eventKey: string|undefined) => {
    setActiveKey(eventKey);
  }, []);

  useEffect(() => {
    (async () => {
      const data = await fetchCategories();
      setCategories(data);
    })();
  }, []);

  return (
    
    <Sidenav
      expanded={expanded}
      defaultOpenKeys={['3', '4']}
      activeKey={activeKey}
      onSelect={handleSelect}
    >
      <Sidenav.Body>
        <Nav>
          <Nav.Item eventKey="1" onClick={()=>navigate("/products")}>
            All Products
          </Nav.Item>
          {(admin || store) && <Dropdown
            placement="rightStart"
            eventKey="2"
            title="Products"
          >
            <Dropdown.Item eventKey="2-1" onClick={() => navigate("/add-product")} >Add Product</Dropdown.Item>
          </Dropdown>}
          <Dropdown
            placement="rightStart"
            eventKey="3"
            title="Categories"
          >
            {(admin || store) && <Dropdown.Item eventKey="3-1" onClick={()=>navigate("/add-category")} >Add Category</Dropdown.Item>}
            <Dropdown.Menu eventKey="3-2" title="Categories List">
              {categories.map((category: any, index: number) => <Dropdown.Item key={category[0]} eventKey={`4-5-${index}`} onClick={()=>{navigate(`category/${category[1]}`)}}>{category[1]}</Dropdown.Item>)}
            </Dropdown.Menu>
          </Dropdown>
          {(!admin && !store) && <Nav.Item eventKey="4" onClick={() => navigate("/orders")}>
            My Orders
          </Nav.Item>}
        </Nav>
      </Sidenav.Body>
      <Sidenav.Toggle expanded={expanded} onToggle={expanded => setExpanded(expanded)} />
    </Sidenav>
  );

};

export default Sidebar;
