import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Product} from '../models/product.model';
import { CreateProductsDTO,UpdateProductsDTO,UpdateTotalStockProductDTO } from '../models/product.model';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private apiUrl = `${environment.API_URL}/products/add_product/`

  constructor(
    private http: HttpClient,
  ) { }

  getAllProducts(){
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id:number){
    return this.http.get<Product>(`${this.apiUrl}${id}/`)
  }

  createProduct(data:CreateProductsDTO){
    return this.http.post<Product>(this.apiUrl, data)
  }

  updateProduct(id:number, data:UpdateProductsDTO){
    return this.http.put<Product>(`${this.apiUrl}${id}/`, data)
  }

  updateTotalStockProduct(id:number, data:UpdateTotalStockProductDTO){
    return this.http.patch<Product>(`${this.apiUrl}${id}/`,data)
  }

  deleteProduct(id:number){
    return this.http.delete<Product>(`${this.apiUrl}${id}/`)
  }
}

