import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpStatusCode } from '@angular/common/http';
import {retry,catchError} from 'rxjs/operators'
import {throwError} from 'rxjs'
import { environment } from 'src/enviroments/environment';

import { PaymentMedium,CreatePaymentMediumDTO } from '../models/payment_medium.models';

@Injectable({
  providedIn: 'root'
})
export class PaymentMediumService {

  private apiUrl = `${environment.API_URL}/bills/payment_medium/`

  constructor(
    private http: HttpClient
  ) { }

  getAllPaymentsMedium(){
    return this.http.get<PaymentMedium[]>(this.apiUrl)
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

  getPaymentMedium(id:number){
    return this.http.get<PaymentMedium>(`${this.apiUrl}${id}/`)
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

  createPaymentMedium(data:CreatePaymentMediumDTO){
    return this.http.post<PaymentMedium>(this.apiUrl,data)
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

  updatePaymentMedium(id:number, data:PaymentMedium){
    return this.http.put<PaymentMedium>(`${this.apiUrl}${id}/`,data)
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

  deletePaymentMedium(id:number){
    return this.http.delete<PaymentMedium>(`${this.apiUrl}${id}/`)
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
