import Cookies from "js-cookie";
import {
  FC,
  createContext,
  useState,
  ReactChild,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { getDataFromStorage, saveDataToStorage } from "util/storage";

interface UserContext {
  user?: any;
  setUser?: any
  userTrigger?: any;
  setUserTrigger?: any
}

const context = createContext<UserContext>({});

const { Provider } = context;

interface Props {
  children: ReactChild | ReactChild[];
}

export const UserProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<any>();
  const [userTrigger, setUserTrigger] = useState<boolean>();
  
  // useCallback(() => { 
  //   console.log("userTrigger", { Phone_Number:Cookies.get("USER"), Role:Cookies.get("ROLE"), Token:Cookies.get("TOK") });
  //   console.log("user", user);
  //   setUser({ ...user, Phone_Number:Cookies.get("USER"), Role:Cookies.get("ROLE"), Token:Cookies.get("TOK") });
  // }[userTrigger])
  useEffect(() => {
    const savedUser = getDataFromStorage('user');
    const data = JSON.parse(Cookies.get("DB_CART") ?? '{"cart":[]}');
    const count = data.cart.reduce(function (sum:any, item:any) {
      return sum + item.count;
    }, 0);
    setUser({ cartCount: count});
  }, [userTrigger]);

  return <Provider value={{ user, setUser, userTrigger, setUserTrigger }}>{children}</Provider>;
};

export const useUser = () => useContext(context);
