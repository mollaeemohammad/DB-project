import { FrontPage } from "pages/front-page";

import { Login, Register } from "pages/login";
import { Navigate } from "react-router-dom";

import { ROLES } from "util/storage";
import { Products } from "pages/products";
import AddProduct from "pages/products/add-product/add-product";
import AddCategory from "pages/category/add-category/add-category";
import { SingleProduct } from "pages/products/single-product/single-product";
import Category from "pages/category/category";
import Cart from "pages/cart/cart";
import { Orders } from "pages/orders/orders";
import { Order } from "pages/orders/order";
import { Categories } from "pages/category";


interface Props {
  name: string;
}

const Dummy = ({ name }: Props) => <p>{name}</p>;

export const routes = (isLoggedIn: boolean) => [
  {
    path: "/",
    element: <FrontPage />,
    children: [
      {
        path: "/category/:NAME",
        element: <Category />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
      {
        path: "/add-category",
        element: <AddCategory />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/product/:NAME",
        element: <SingleProduct />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/order/:ID",
        element: <Order />,
      },
    ]
  },
  {
    path: "/login/customer",
    element: <Login Role="customer" />,
  },
  {
    path: "/login/admin",
    element: <Login Role="admin" />,
  },
  {
    path: "/login/store",
    element: <Login Role="store" />,
  },
  {
    path: "/register/customer",
    element: <Register Role="customer" />,
  },
  {
    path: "/register/store",
    element: <Register Role="store" />,
  },
  
  
  {
    path: "*",
    element: <Dummy name="404" />,
  },
];
