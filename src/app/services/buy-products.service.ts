import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../enviroments/environment'
import { BuyProducts,UpdateBuysProductDTO,createBuysProductDTO } from '../models/buy_product.model';

@Injectable({
  providedIn: 'root'
})
export class BuyProductsService {

  private apiUrl = `${environment.API_URL}/products/add_buy_product/`
  constructor(
    private http: HttpClient
  ) { }

  getAllBuyProducts(){
    return this.http.get<BuyProducts[]>(this.apiUrl)
  }

  getBuyProduct(id:number){
    return this.http.get<BuyProducts>(`${this.apiUrl}${id}/`)
  }

  createBuyProduct(data:createBuysProductDTO){
    return this.http.post<BuyProducts>(this.apiUrl,data)
  }

  updateBuyProduct(id:number, data:UpdateBuysProductDTO){
    return this.http.put<BuyProducts>(`${this.apiUrl}${id}/`,data)
  }

  deleteBuyProduct(id:number){
    return this.http.delete<BuyProducts>(`${this.apiUrl}${id}/`)
  }

}
