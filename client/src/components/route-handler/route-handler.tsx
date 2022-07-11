import { FC, useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import { Loader } from "rsuite";
import { useUser } from "contexts/user";
import { routes } from "router";
import Cookies from "js-cookie";


const RouteHandler: FC = () => {
  const { user, setUser, userTrigger } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    setUser({Token:Cookies.get("TOK"), Phone_Number:Cookies.get("USER"), Role:Cookies.get("ROLE") });
  }, [userTrigger]);

  const routing = useRoutes(routes(!!user?.Token));

  if (loading)
    return (
      <div style={{ width: "100vw", height: "100vh", position: "relative", margin: "auto"  }}>
        <Loader style={{ position: "absolute", left:"50%", top:"50%", transform: "translateX(-50%) translateY(-50%)" }} size="lg" content="" />
      </div>
    );

  return routing;
};

export default RouteHandler;
