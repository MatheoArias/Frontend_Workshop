import { Category } from './category.model';


  // product={
  //   id: 0,
  //   category_id: {
  //     id:0,
  //     category: ''
  //   },
  //   code: '',
  //   description: '',
  //   unit_value:0,
  //   totals_stock: 0,
  //   percentage:0,
  // }
export interface Product {
  id: number;
  category_id: Category;
  code: string;
  description: string;
  unit_value:number;
  totals_stock: number;
  percentage:number;
}

// product={
  //category_id: 1 - number -this is the category id
  //code: MT001 - string,
  //description: Farola - String,
  //unit_value: 15000 - number,
  //totals_stock: 15 - number,
  //percentage: 45 /100 *** This number come of  input component
//}
export interface CreateProductsDTO extends Omit<Product, 'id' | 'category_id'> {
  category_id: number;
}


//product={
  //id: 1 -number  -this is the products id
  //category_id: 1 - number -this is the category id
  //code: MT001 - string,
  //description: Farola - String,
  //unit_value: 15000 - number,
  //totals_stock: 15 - number,
  //percentage: 45 /100 *** This number come of  input component
//}
export interface UpdateProductsDTO extends CreateProductsDTO {
  id: number;
}


export type UpdateTotalStockProductDTO = Pick<Product, 'totals_stock' | 'unit_value'>

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


