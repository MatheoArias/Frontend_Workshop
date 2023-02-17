import { Product } from "./product.model";

export interface BuyProducts {
  id:number;
  product_id:Product;
  buys_date:Date;
  buys_bill: string;
  buys_stock:number;
  buys_unit_value:number;

}

export interface createBuysProductDTO extends Omit<BuyProducts, 'id'| 'product_id'> {
  product_id:number;
}

export interface UpdateBuysProductDTO extends BuyProducts {

}
