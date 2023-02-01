import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Product} from '../models/product.model';
import { CreateProductsDTO,UpdateProductsDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private urlProducts='http://127.0.0.1:8000/products/add_product/'

  constructor(
    private http: HttpClient,
  ) { }

  getAllProducts(){
    return this.http.get<Product[]>(this.urlProducts)
  }

  getProduct(id:number){
    return this.http.get<Product>(`${this.urlProducts}${id}/`)
  }

  createProduct(data:CreateProductsDTO){
    return this.http.post<Product>(this.urlProducts, data)
  }

  updateProduct(id:number, data:UpdateProductsDTO){
    return this.http.put<Product>(`${this.urlProducts}${id}/`, data)
  }

  deleteProduct(id:number){
    return this.http.delete<Product>(`${this.urlProducts}${id}/`)
  }
}

