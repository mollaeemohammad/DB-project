import { FC, useState } from "react";
import { ToastContainer } from "react-toastify";

import { RouteHandler } from "components/route-handler";

import "react-toastify/dist/ReactToastify.min.css";

import 'rsuite/dist/rsuite.min.css';
import './assets/css/colors.css';
import './assets/css/override-rsuite.css';

import "./assets/css/icons.min.css";
import "./index.css";

import { UserProvider } from "contexts/user";

import { CustomProvider, Toggle } from "rsuite";
import { ModalProvider } from './contexts/modal';
import Cookies from "js-cookie";

const App: FC = () => {
  const [dark, setDark] = useState(Cookies.get("DB_MODE")=="false"?false:true);
  return (
    <CustomProvider theme={dark?"dark":"light"}>
      <Toggle
        style={{ position: "fixed", bottom: "10px", right: "10px" }}
        onChange={() => {
          Cookies.set("DB_MODE", (!dark).toString());
          setDark(!dark);
        }}
      />
      <UserProvider>
        <ModalProvider>
          <RouteHandler />
        </ModalProvider>
      </UserProvider>
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </CustomProvider >
  );
};

export default App;
