import { Category } from "./category.models";

export interface Product {
  id:                     number;
  product_code:           string;
  product_description:    string;
  total_stock:            number;
  product_destination_id: Category;
}

export interface CreateProductsDTO extends Omit<Product,'id'| 'product_destination_id'>{
  product_destination_id: number;
  product_code:           string;
  product_description:    string;
  total_stock:            number;
}

export interface UpdateProductsDTO extends Partial<CreateProductsDTO>{
  id:number;
}




