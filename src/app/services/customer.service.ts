import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse,HttpStatusCode} from '@angular/common/http';
import {retry,catchError} from 'rxjs/operators'
import {throwError} from 'rxjs'

import { Customer,UpdateCustomerDTO,CreateCustomerDTO } from '../models/customer.model';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = `${environment.API_URL}/customers/add_customer/`
  constructor(
    private http:HttpClient,
  ) { }

  getAllCustomer(){
    return this.http.get<Customer[]>(this.apiUrl)
    .pipe(
      retry(3),
      catchError((error:HttpErrorResponse) => {
        if(error.status===HttpStatusCode.Conflict){
          return throwError('Algo está fallando en el servidor');
        }
        if(error.status===HttpStatusCode.BadRequest){
          return throwError('Está realizando una petición inadecuada');
        }
        if(error.status===HttpStatusCode.NotFound){
          return throwError('La página no ha sido encontada');
        }
        if(error.status===HttpStatusCode.Unauthorized){
          return throwError('No estás autorizado');
        }
        return throwError('Algo está saliendo mal');
      })
    );
  }

  getCustomer(id:number){
    return this.http.get<Customer>(`${this.apiUrl}${id}/`)
    .pipe(
      retry(3),
      catchError((error:HttpErrorResponse) => {
        if(error.status===HttpStatusCode.Conflict){
          return throwError('Algo está fallando en el servidor');
        }
        if(error.status===HttpStatusCode.BadRequest){
          return throwError('Está realizando una amala petición');
        }
        if(error.status===HttpStatusCode.NotFound){
          return throwError('La página no ha sido encontada');
        }
        if(error.status===HttpStatusCode.Unauthorized){
          return throwError('No estás autorizado');
        }
        return throwError('Algo está saliendo mal');
      }
    )
  )}

  createCustomer(data:CreateCustomerDTO){
    return this.http.post<Customer>(this.apiUrl,data)
    .pipe(
      retry(3),
      catchError((error:HttpErrorResponse) => {
        if(error.status===HttpStatusCode.Conflict){
          return throwError('Algo está fallando en el servidor');
        }
        if(error.status===HttpStatusCode.BadRequest){
          return throwError('Está realizando una amala petición');
        }
        if(error.status===HttpStatusCode.NotFound){
          return throwError('La página no ha sido encontada');
        }
        if(error.status===HttpStatusCode.Unauthorized){
          return throwError('No estás autorizado');
        }
        return throwError('Algo está saliendo mal');
      }
    )
  )}

  deleteCustomer(id:number){
    return this.http.delete<Customer>(`${this.apiUrl}${id}/`)
    .pipe(
      retry(3),
      catchError((error:HttpErrorResponse) => {
        if(error.status===HttpStatusCode.Conflict){
          return throwError('Algo está fallando en el servidor');
        }
        if(error.status===HttpStatusCode.BadRequest){
          return throwError('Está realizando una amala petición');
        }
        if(error.status===HttpStatusCode.NotFound){
          return throwError('La página no ha sido encontada');
        }
        if(error.status===HttpStatusCode.Unauthorized){
          return throwError('No estás autorizado');
        }
        return throwError('Algo está saliendo mal');
      }
    )
  )}

  updateCustomer(data:UpdateCustomerDTO,id:number){
    return this.http.put<Customer>(`${this.apiUrl}${id}/`,data)
    .pipe(
      retry(3),
      catchError((error:HttpErrorResponse) => {
        if(error.status===HttpStatusCode.Conflict){
          return throwError('Algo está fallando en el servidor');
        }
        if(error.status===HttpStatusCode.BadRequest){
          return throwError('Está realizando una amala petición');
        }
        if(error.status===HttpStatusCode.NotFound){
          return throwError('La página no ha sido encontada');
        }
        if(error.status===HttpStatusCode.Unauthorized){
          return throwError('No estás autorizado');
        }
        return throwError('Algo está saliendo mal');
      }
    )
    )
  }

}
