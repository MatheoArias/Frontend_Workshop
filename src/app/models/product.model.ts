import { Category } from './category.model';

export interface Product {
  id: number;
  category_id: Category;
  code: string;
  description: string;
  buys_stock:number;
  unit_value:number;
  totals_stock: number;
}

export interface CreateProductsDTO extends Omit<Product, 'id' | 'category_id'> {
  category_id: number;
}

export interface UpdateProductsDTO extends Partial<CreateProductsDTO> {
  id: number;
}
