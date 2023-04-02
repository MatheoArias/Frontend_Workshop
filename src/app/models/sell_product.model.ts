import { Product } from "./product.model";

export interface SellProducts{
  id:number;
  product_id: Product;
  sell_date:Date;
  sell_bill:string;
  sell_stock:number;
  total_sell_value:number;
}

export interface CreateSellProductsDTO extends Omit<SellProducts, 'id' | 'product_id'>{
  product_id:number;
}

export interface UpdateSellProductsDTO extends CreateSellProductsDTO {
  id:number;
}
