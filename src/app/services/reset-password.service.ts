import { Injectable } from '@angular/core';
import {environment} from '../../enviroments/environment'
import {HttpClient,HttpErrorResponse,HttpStatusCode} from '@angular/common/http';
import {retry,catchError} from 'rxjs/operators'
import {throwError} from 'rxjs'
import { PasswordReset } from '../models/password-reset.model';

@Injectable({
  providedIn: 'root'
})

export class ResetPasswordService {

  private apiUrl = `${environment.API_URL}/password/reset/`

  constructor(
    private http: HttpClient,
  ) {}


  resetPassword(data:string){
    return this.http.post<string>(this.apiUrl, data)
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
        return throwError('Algo está saliendo mal')
      })
    );
  }

  resetConfirmPassword(data:PasswordReset){
    return this.http.post<PasswordReset>(`${this.apiUrl}confirm`, data)
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
        return throwError('Algo está saliendo mal')
      })
    );
  }
}
