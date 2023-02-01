import { Product } from "./product.model";

export interface ProductsInput {
  id:           number;
  product_id:   Product;
  date_buy:     Date;
  bill_buy:     string;
  cuantity_buy: number;
}

export interface DTOProductsInput extends Omit<ProductsInput, 'id' | 'product_id'> {
  product_id: number;
  date_buy: Date;
  bill_buy: string;
  cuantity_buy: number;
}
