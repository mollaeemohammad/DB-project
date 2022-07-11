import TextField from "components/form/textfield";
import { FlexboxGrid, Col, Content, Panel, Form, ButtonToolbar, Button } from "rsuite";
import { useRef, useState, useCallback} from "react";

import { userRegisterModel, userRegisterFormModel } from "models/forms/register";
import { loginUser, registerUser } from "core/api";
import { showToast } from "util/toast";

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface Props {
  Role:string
}
const Register = ({Role}:Props) => {
  const navigate = useNavigate();
  const userLoginFormRef = useRef<any>();
  const [userLoginFormError, setUserLoginFormError] = useState<any>();
  const [userLoginFormValue, setUserLoginFormValue] = useState<any>();


  // loaders
  const [loadingLoginButton, setLoadingLoginButton] = useState(false);


  const registerUserApi = useCallback(async (query:userRegisterModel) => {
    try {
      const { status, data } = await registerUser(query, Role);
      if (status === 200) {
        console.log(data);
        showToast("Registered in successfully", "success");
        navigate(`/login/${Role}`);
        return;
      }
    } catch (e) {
      console.log(e);
    }
    showToast("Error", "error");
  }, []);


  const handleUserLoginSubmit = useCallback(async() => {
    if (userLoginFormRef.current && !userLoginFormRef.current.check()) {
      console.log(userLoginFormError, 'Register Form Error');
      return;
    }
    console.log('userRegisterFormValue', userLoginFormValue);
    setLoadingLoginButton(true);
    await registerUserApi(userLoginFormValue);
    setLoadingLoginButton(false);
  },[userLoginFormValue]);
  
  return (
    <Content>
      <FlexboxGrid justify="center" align="middle" style={{ height: '90vh', flex: '1' }}>
        <FlexboxGrid.Item as={Col} colspan={23} sm={20} md={10} lg={8}>
          <Panel header={<h3 className="text-center">Register { Role }</h3>} bordered>
            <Form model={userRegisterFormModel} ref={userLoginFormRef} onChange={setUserLoginFormValue} onCheck={setUserLoginFormError} formError={userLoginFormError} onSubmit={handleUserLoginSubmit} style={{ margin: "auto", width: "100%", maxWidth: "400px" }}>
              {(Role == "admin" || Role=="store")&&<TextField type="text" name="name" label="Name" placeholder="name" />}
              {Role == "customer" && (<><TextField type="text" name="username" label="Username" placeholder="username" />
              <TextField type="text" name="first_name" label="First Name" placeholder="First Name" />
              <TextField type="text" name="last_name" label="Last Name" placeholder="Last Name" /></>)}
              {Role == "store" && <TextField type="text" name="location" label="Location" placeholder="Location" />}
              <TextField type="password" name="password" label="Password" placeholder="password" />
              <ButtonToolbar>
              <Button style={{ width: "50%", margin: "auto", marginTop: "40px", display: "block" }} appearance="default" type="submit" loading={loadingLoginButton} disabled={loadingLoginButton} >Register</Button>
              </ButtonToolbar>
            </Form>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>

    </Content>
  );
};

export default Register;