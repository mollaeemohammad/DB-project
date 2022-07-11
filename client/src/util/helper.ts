import Cookies from "js-cookie";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import moment from "moment";

/**
 * Function to parse phone number and return phone number with country code
 * @function parsePhoneNumber
 * @param {string} numberToParse - Number we want to parse
 * @returns {string} Returns parsed phone number (country code included)
 */
export function parsePhoneNumber(numberToParse: string) {
  if (!numberToParse) return null;

  // Parses converted phone number and add country code to it.
  const parsed = parsePhoneNumberFromString(numberToParse, "IR")?.number;

  return parsed;
}

const isArray = function (a: any) {
  return Array.isArray(a);
};

const isObject = function (o: any) {
  return o === Object(o) && !isArray(o) && typeof o !== "function";
};

const toSnake = (str: string) => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

export const keysToSnake = (o: any) => {
  if (isObject(o)) {
    const n: Record<string, any> = {};

    Object.keys(o).forEach((k) => {
      n[toSnake(k)] = keysToSnake(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i: any) => {
      return keysToSnake(i);
    });
  }

  return o;
};

const toCamel = (s: any): string => {
  return s.replace(/([-_][a-z])/gi, ($1: string) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

export const keysToCamel = function (o: any) {
  if (isObject(o)) {
    const n: Record<string, any> = {};

    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i: any) => {
      return keysToCamel(i);
    });
  }

  return o;
};

export function convertDateToCal(date: number) {
  const now = moment();
  const parsedDate = moment(date);
  if (parsedDate.format("YYYY-MM-DD") === now.format("YYYY-MM-DD")) {
    return "امروز";
  }
  return parsedDate.format("jDD jMMMM");
}

export function isImageOk(url: any) { 
  const img = new Image();
  img.src = url;
  return img.height != 0;
}

export const p2e = (s:any) => s.replace(/[۰-۹]/g, (d:any) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

export const getBase64FromUrl = async (url:string) => {
  console.log(url);
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = () => {
      const base64data = reader.result;   
      resolve(base64data);
    }
  });
}

export const isAdmin = () => {
  return Cookies.get("DB_ROLE") == "admin";
};
export const isStore = () => {
  return Cookies.get("DB_ROLE") == "store";
};