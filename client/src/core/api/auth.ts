import { appNetworkManager } from "./network-manager";
import { userLoginModel, userRegisterModel } from "models";

const LOGIN_USER_URI =(role:string)=> `/api/login_${role}`;
export const loginUser = (params: userLoginModel, role:string) => {
  console.log("Login User: ", LOGIN_USER_URI(role), params);
  return appNetworkManager.post(LOGIN_USER_URI(role), params);
};
const LOGOUT_USER_URI = `/api/logout`;
export const logoutUser = () => {
  console.log("logoutUser: ", LOGIN_USER_URI);
  return appNetworkManager.post(LOGOUT_USER_URI, {});
};

const Register_USER_URI =(role:string)=> `/api/add_new_${role}`;
export const registerUser = (params: userRegisterModel, role:string) => {
  console.log("registerUser: ", Register_USER_URI(role), params);
  return appNetworkManager.post(Register_USER_URI(role), params);
};

