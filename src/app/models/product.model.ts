import { __values } from 'tslib';
import { Category } from './category.model';

export interface Product {
  id: number;
  category_id: Category;
  code: string;
  description: string;
  unit_value:number;
  totals_stock: number;
  percentage:number;
}

export interface CreateProductsDTO extends Omit<Product, 'id' | 'category_id'> {
  category_id: number;
}

export interface UpdateProductsDTO extends CreateProductsDTO {
  id: number;
}

export interface UpdateTotalStockProductDTO extends Pick<Product, 'totals_stock'>{

}

export interface Movements extends Pick<Product, 'code' | 'description' | 'totals_stock'>{
  stock:number;
  date:Date;
  bill:string
  category:'Entrada' | 'Salida';
  total_value:number;
}

export interface MovementesChart{
  name:string;
  value:number;
}


