import { SellProducts } from "./sell_product.model";
import { Employees } from "./employee.model";
import { Vehicles } from "./vehicle.models";
import { Customer } from "./customer.model";
import { Discounts } from "./discount.model";
import { PaymentMedium } from "./payment_medium.models";

export interface Bill{
  id:number;
  employee:Employees;
  customer:Customer;
  vehicle:Vehicles;
  payment_medium:PaymentMedium;
  products_sell:SellProducts[];
  subtotal:number;
  tax:number;
  tax_surcharge:number;
  total_value:number
}

export interface CreateBillDTO extends Omit<Bill, 'id' | 'employee' | 'customer' | 'vehicle' | 'payment_medium' | 'products_sell'>{
  employee:number;
  customer:number;
  vehicle:number;
  payment_medium:number;
  products_sell:number[];
}

export interface UpdateBillDTO extends CreateBillDTO{
  id:number
}
