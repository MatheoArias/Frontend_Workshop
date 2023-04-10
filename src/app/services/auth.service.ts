import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import {HttpClient,HttpErrorResponse,HttpStatusCode} from '@angular/common/http';
import { Auth } from '../models/auth.models';
import { TokenService } from './token.service';
import { tap } from 'rxjs';
import {retry,catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrlLogin = `${environment.API_URL}/login`
  private apiUrlLogout = `${environment.API_URL}/logout`

  constructor(
    private http:HttpClient,
    private tokenService:TokenService
  ) { }

  login(username:string,password:string){
    return this.http.post<Auth>(this.apiUrlLogin,
      {
        email:username,
        password:password
      }
    ).pipe(
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
      }),
      tap(data=>this.tokenService.saveToken(data.token)
      )
  )};

  logout(id:number) {
    return this.http.post<Auth>(this.apiUrlLogout,
      {
        user:id,
      }
  ).pipe(
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
    }),
  )};

}
