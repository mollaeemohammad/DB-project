export const removeDataFromStorage = (key: string) => {
  window.localStorage.removeItem(key);
};

export const saveDataToStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getDataFromStorage = (key: string) => {
  const data = window.localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const getDataFromCookie = (key: string): string => {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  const val = b ? b.pop() : "";
  return val ? val : "";
};
export const setCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export enum storageKeys {
  USER_TOKEN = "USER_TOKEN",
  USER_TYPE = "USER_TYPE",
}
export const ROLES = {
  SUPPLIER: "SUPPL",
  USER: "USER",
  ADMIN: "ADMIN",
};

export const COUNTDOWN_TIMEOUT = 120;

export const COLORS = [
  { label: "red", value: "red" },
  { label: "green", value: "green" },
  { label: "blue", value: "blue" },
  { label: "yellow", value: "yellow" },
  { label: "orange", value: "orange" },
  { label: "purple", value: "purple" },
  { label: "pink", value: "pink" },
  { label: "brown", value: "brown" },
  { label: "black", value: "black" },
  { label: "white", value: "white" },
  { label: "gray", value: "gray" },
  { label: "indigo", value: "indigo" },
  { label: "teal", value: "teal" },
  { label: "cyan", value: "cyan" },
  { label: "lime", value: "lime" },
];

