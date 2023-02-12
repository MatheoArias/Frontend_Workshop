import { Product } from "./product.model";

export interface SellProducts{
  id:number;
  product_id: Product;
  sell_date:Date;
  sell_bill:string;
  sell_stock:number;
  total_sell_value:number;
}

export interface CreateSellProductsDTO extends Omit<Product, 'id' | 'product_id'>{

}

export interface UpdateSellProductsDTO extends Omit<Product,'product_id'> {
  product_id:number;
}
