import { appNetworkManager } from "./network-manager";

const USER_URI = "users/me";

export const getUsero = () => {
  return appNetworkManager.get(USER_URI);
};
