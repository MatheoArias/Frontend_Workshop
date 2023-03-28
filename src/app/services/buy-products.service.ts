import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse,HttpStatusCode} from '@angular/common/http';
import {environment} from '../../enviroments/environment'
import { BuyProducts,UpdateBuysProductDTO,createBuysProductDTO } from '../models/buy_product.model';
import {retry,catchError} from 'rxjs/operators'
import {throwError} from 'rxjs'
import { UpdateProductsDTO} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class BuyProductsService {

  BuyProductsService(id: any, product: UpdateProductsDTO): any {
    throw new Error('Method not implemented.');
  }

  private apiUrl = `${environment.API_URL}/products/add_buy_product/`
  constructor(
    private http: HttpClient
  ) { }


  getAllBuyProducts(){
    return this.http.get<BuyProducts[]>(this.apiUrl)
    .pipe(
      retry(3),
      catchError((error:HttpErrorResponse) => {
        if(error.status===HttpStatusCode.Conflict){
          return throwError('Algo está fallando en el servidor');
        }
        if(error.status===HttpStatusCode.BadRequest){
          return throwError('Está realizando una amala petición')
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

  getBuyProduct(id:number){
    return this.http.get<BuyProducts>(`${this.apiUrl}${id}/`)
    .pipe(
      retry(3),
      catchError((error:HttpErrorResponse) => {
        if(error.status===HttpStatusCode.Conflict){
          return throwError('Algo está fallando en el servidor');
        }
        if(error.status===HttpStatusCode.BadRequest){
          return throwError('Está realizando una amala petición')
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

  createBuyProduct(data:createBuysProductDTO){
    return this.http.post<BuyProducts>(this.apiUrl,data)
    .pipe(
      retry(3),
      catchError((error:HttpErrorResponse) => {
        if(error.status===HttpStatusCode.Conflict){
          return throwError('Algo está fallando en el servidor');
        }
        if(error.status===HttpStatusCode.BadRequest){
          return throwError('Está realizando una amala petición')
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

  updateBuyProduct(id:number, data:UpdateBuysProductDTO){
    return this.http.put<BuyProducts>(`${this.apiUrl}${id}/`,data)
    .pipe(
      retry(3),
      catchError((error:HttpErrorResponse) => {
        if(error.status===HttpStatusCode.Conflict){
          return throwError('Algo está fallando en el servidor');
        }
        if(error.status===HttpStatusCode.BadRequest){
          return throwError('Está realizando una amala petición')
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

  deleteBuyProduct(id:number){
    return this.http.delete<BuyProducts>(`${this.apiUrl}${id}/`)
    .pipe(
      retry(3),
      catchError((error:HttpErrorResponse) => {
        if(error.status===HttpStatusCode.Conflict){
          return throwError('Algo está fallando en el servidor');
        }
        if(error.status===HttpStatusCode.BadRequest){
          return throwError('Está realizando una amala petición')
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
