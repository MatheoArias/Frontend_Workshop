import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SellProducts,CreateSellProductsDTO,UpdateSellProductsDTO } from '../models/sell_product.model';
import {environment} from '../../enviroments/environment'

@Injectable({
  providedIn: 'root'
})
export class SellProductsService {

  private apiUrl = `${environment.API_URL}/products/add_sell_product/`

  constructor(
    private http: HttpClient,
  ) { }



  getAllSellProducts(
    ){
      return this.http.get<SellProducts[]>(this.apiUrl)
    }

    getSellProducts(id:number){
      return this.http.get<SellProducts>(`${this.apiUrl}${id}/`)
    }

    createSellProducts(data:CreateSellProductsDTO){
      return this.http.post<SellProducts>(this.apiUrl, data)
    }

    updateSellProducts(id:number, data:UpdateSellProductsDTO){
      return this.http.put<SellProducts>(`${this.apiUrl}${id}/`, data)
    }

    deleteSellProducts(id:number){
      return this.http.delete<SellProducts>(`${this.apiUrl}${id}/`)
    }
}
