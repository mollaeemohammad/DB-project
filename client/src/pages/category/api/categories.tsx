import { getCategories, getCategory } from "core/api";

export const fetchCategories = async() => {
  try{
    const { status, data } = await getCategories();
    if (status === 200) {
      return data;
    }
  } catch (e) {
    console.log(e);
  }
  return [];
};
export const fetchCategory = async(param:any) => {
  try{
    const { status, data } = await getCategory(param);
    if (status === 200) {
      return data;
    }
  } catch (e) {
    console.log(e);
  }
  return [];
};