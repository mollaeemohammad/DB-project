
export interface addProductModel {
  name: string,
  count: number,
  price: number,
  store_id: number,
  category_id: number,
  picture?: string,
  weight?: number,
  color: string,
  dimensions?: string,
  description?: string,
  discount_percentage?:string 
}
export interface addCategoryModel {
  name: string,
}