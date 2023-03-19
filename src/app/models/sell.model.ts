import { Vehicles } from "./vehicle.models";
import { Customer } from "./customer.model";
import { Employees } from "./employee.model";
import { Product } from "./product.model";
import { PaymentMedium } from "./payment_medium.models";
import { Discounts } from "./discount.model";



export interface Sell {
  id:number;
  bill_number:string;
  customer:Customer;
  vehicle:Vehicles;
  employee:Employees;
  payment_medium:PaymentMedium;
  products_sell:Product[];
  discounts:Discounts;
  discount_value:number;
  subtotal:number;
  tax: number;
  tax_surcharge:number;
  total_value:number;
}

export interface CreateSellDTO extends Omit<Sell, 'id' | 'customer' | 'vehicle' | 'employee' | 'payment_medium' | 'products_sell' | 'discounts'>{
  customer:number;
  vehicle:number;
  employee:number;
  payment_medium:number;
  products_sell:number[];
  discounts:number
}

export interface UpdateSellDTO extends CreateSellDTO{
  id:number;
}
