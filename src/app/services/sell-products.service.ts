import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse,HttpStatusCode} from '@angular/common/http';
import { SellProducts,CreateSellProductsDTO,UpdateSellProductsDTO } from '../models/sell_product.model';
import {environment} from '../../enviroments/environment'
import {retry,catchError} from 'rxjs/operators'
import {throwError} from 'rxjs'

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
      .pipe(
        retry(3),
        catchError((error:HttpErrorResponse) => {
          if(error.status===HttpStatusCode.Conflict){
            return throwError('Algo está fallando en el servidor');
          }
          if(error.status===HttpStatusCode.BadRequest){
            return throwError('Está realizando una mala petición')
          }
          if(error.status===HttpStatusCode.NotFound){
            return throwError('La página no ha sido encontada')
          }
          if(error.status===HttpStatusCode.Unauthorized){
            return throwError('No estás autorizado')
          }
          return throwError('Algo está saliendo mal')
        })
      );
    }

    getSellProducts(id:number){
      return this.http.get<SellProducts>(`${this.apiUrl}${id}/`)
      .pipe(
        retry(3),
        catchError((error:HttpErrorResponse) => {
          if(error.status===HttpStatusCode.Conflict){
            return throwError('Algo está fallando en el servidor');
          }
          if(error.status===HttpStatusCode.BadRequest){
            return throwError('Está realizando una mala petición')
          }
          if(error.status===HttpStatusCode.NotFound){
            return throwError('La página no ha sido encontada')
          }
          if(error.status===HttpStatusCode.Unauthorized){
            return throwError('No estás autorizado')
          }
          return throwError('Algo está saliendo mal')
        })
      );
    }

    createSellProducts(data:CreateSellProductsDTO){
      return this.http.post<SellProducts>(this.apiUrl, data)
      .pipe(
        retry(3),
        catchError((error:HttpErrorResponse) => {
          if(error.status===HttpStatusCode.Conflict){
            return throwError('Algo está fallando en el servidor');
          }
          if(error.status===HttpStatusCode.BadRequest){
            return throwError('Está realizando una mala petición')
          }
          if(error.status===HttpStatusCode.NotFound){
            return throwError('La página no ha sido encontada')
          }
          if(error.status===HttpStatusCode.Unauthorized){
            return throwError('No estás autorizado')
          }
          return throwError('Algo está saliendo mal')
        })
      );
    }

    updateSellProducts(id:number, data:UpdateSellProductsDTO){
      return this.http.put<SellProducts>(`${this.apiUrl}${id}/`, data)
      .pipe(
        retry(3),
        catchError((error:HttpErrorResponse) => {
          if(error.status===HttpStatusCode.Conflict){
            return throwError('Algo está fallando en el servidor');
          }
          if(error.status===HttpStatusCode.BadRequest){
            return throwError('Está realizando una mala petición')
          }
          if(error.status===HttpStatusCode.NotFound){
            return throwError('La página no ha sido encontada')
          }
          if(error.status===HttpStatusCode.Unauthorized){
            return throwError('No estás autorizado')
          }
          return throwError('Algo está saliendo mal')
        })
      );
    }

    deleteSellProducts(id:number){
      return this.http.delete<SellProducts>(`${this.apiUrl}${id}/`)
      .pipe(
        retry(3),
        catchError((error:HttpErrorResponse) => {
          if(error.status===HttpStatusCode.Conflict){
            return throwError('Algo está fallando en el servidor');
          }
          if(error.status===HttpStatusCode.BadRequest){
            return throwError('Está realizando una mala petición')
          }
          if(error.status===HttpStatusCode.NotFound){
            return throwError('La página no ha sido encontada')
          }
          if(error.status===HttpStatusCode.Unauthorized){
            return throwError('No estás autorizado')
          }
          return throwError('Algo está saliendo mal')
        })
      );
    }
}
