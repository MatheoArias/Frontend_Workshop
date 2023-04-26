import { Product } from "./product.model";
import { Discounts } from "./discount.model";

export interface SellProducts{
  id:number;
  product_id: Product;
  sell_date:Date;
  sell_bill:string;
  sell_stock:number;
  total_sell_value:number;
  discount_id: Discounts;
}

export interface CreateSellProductsDTO extends Omit<SellProducts, 'id' | 'product_id' | 'discount_id'>{
  product_id:number;
  discount_id:number | null;
}

export interface UpdateSellProductsDTO extends CreateSellProductsDTO {
  id:number;
}

export interface BillSellProductId extends Pick<CreateSellProductsDTO, 'product_id' | 'sell_bill'>{
  id:number;
}
