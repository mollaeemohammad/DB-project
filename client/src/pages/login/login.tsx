import TextField from "components/form/textfield";
import { FlexboxGrid, Col, Content, Panel, Form, ButtonToolbar, Button } from "rsuite";
import { useRef, useState, useCallback} from "react";

import { userLoginModel, userLoginFormModel } from "models/forms/register";
import { loginUser } from "core/api";
import { showToast } from "util/toast";

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface Props {
  Role:string
}
const Login = ({Role}:Props) => {
  const navigate = useNavigate();
  const userLoginFormRef = useRef<any>();
  const [userLoginFormError, setUserLoginFormError] = useState<any>();
  const [userLoginFormValue, setUserLoginFormValue] = useState<any>();


  // loaders
  const [loadingLoginButton, setLoadingLoginButton] = useState(false);


  const LoginUserApi = useCallback(async (query:userLoginModel) => {
    try {
      const { status, data } = await loginUser(query, Role);
      if (status === 200 && data.message=="Successful") {
        console.log(data);
        showToast("Logged in successfully", "success");
        Cookies.set("DB_ROLE", Role);
        Cookies.set("DB_USERNAME", data.username);
        Cookies.set("DB_ID", data.id);
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
    setUserLoginFormError({ username: "Username or password is wrong" });
  }, []);


  const handleUserLoginSubmit = useCallback(async() => {
    if (userLoginFormRef.current && !userLoginFormRef.current.check()) {
      console.log(userLoginFormError, 'Login Form Error');
      return;
    }
    console.log('userLoginFormValue', userLoginFormValue);
    setLoadingLoginButton(true);
    await LoginUserApi(userLoginFormValue);
    setLoadingLoginButton(false);
  },[userLoginFormValue]);
  
  return (
    <Content>
      <FlexboxGrid justify="center" align="middle" style={{ height: '90vh', flex: '1' }}>
        <FlexboxGrid.Item as={Col} colspan={23} sm={20} md={10} lg={8}>
          <Panel header={<h3 className="text-center">Login { Role }</h3>} bordered>
            <Form model={userLoginFormModel} ref={userLoginFormRef} onChange={setUserLoginFormValue} onCheck={setUserLoginFormError} formError={userLoginFormError} onSubmit={handleUserLoginSubmit} style={{ margin: "auto", width: "100%", maxWidth: "400px" }}>
              {(Role == "admin" || Role=="store")&&<TextField type="text" name="name" label="Name" placeholder="name" />}
              {Role == "customer" && <TextField type="text" name="username" label="Username" placeholder="username" />}
              <TextField type="text" name="password" label="Password" placeholder="password" />
              <ButtonToolbar>
              <Button style={{ width: "50%", margin: "auto", marginTop: "40px", display: "block" }} appearance="default" type="submit" loading={loadingLoginButton} disabled={loadingLoginButton} >Login</Button>
              </ButtonToolbar>
            </Form>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>

    </Content>
  );
};

export default Login;