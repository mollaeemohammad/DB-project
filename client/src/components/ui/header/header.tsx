import { Navbar, Nav, Dropdown } from 'rsuite';
import { showToast } from 'util/toast';

import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { logoutUser } from 'core/api';
import { isStringTextContainingNode } from 'typescript';
import { isAdmin, isStore } from 'util/helper';
import { useState } from 'react';
import { useUser } from 'contexts/user';

const Header = () => {
  const navigate = useNavigate();
  const {user} = useUser();
  const [admin, setAdmin] = useState(isAdmin());
  const [store, setStore] = useState(isStore());

  const handleLogout = async() => {
    try {
      await logoutUser();
    } catch (e) {
      console.log(e);
    }
    Cookies.remove("DB_ROLE");
    navigate("/login/customer");
  };

  return (
  <Navbar>
    <Navbar.Brand>LOGO</Navbar.Brand>
    <Nav>
      <Nav.Item >Home</Nav.Item>
      <Nav.Item>Products</Nav.Item>
      {(admin || store) && <Nav.Item onClick={()=>navigate("/add-product")}>Add Product</Nav.Item>}
      <Dropdown title="About">
        <Dropdown.Item>Company</Dropdown.Item>
        <Dropdown.Item>Team</Dropdown.Item>
        <Dropdown.Item>Contact</Dropdown.Item>
      </Dropdown>
    </Nav>
    <Nav pullRight>
      <Nav.Item onClick={()=>navigate("/cart")} >Cart count: {user.cartCount}</Nav.Item>
      <Nav.Item >{Cookies.get("DB_ROLE")}</Nav.Item>
      <Nav.Item onClick={handleLogout}>Logout</Nav.Item>
    </Nav>
  </Navbar>
  );
};

export default Header;
function idAdmin(): any {
  throw new Error('Function not implemented.');
}

