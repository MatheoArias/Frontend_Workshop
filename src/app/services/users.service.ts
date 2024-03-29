import { Injectable } from '@angular/core';
import { CreateUsersDto,Users } from '../models/users.model';
import {HttpClient,HttpErrorResponse,HttpStatusCode} from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import {retry,catchError} from 'rxjs/operators'
import {throwError} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = `${environment.API_URL}/users/`
  constructor(
    private http: HttpClient
  ) {}

  createUser(data:CreateUsersDto){
    return this.http.post<Users>(`${this.apiUrl}add_user/`, data)
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

  getAllUsers(){
    return this.http.get<Users>(`${this.apiUrl}customer_user/`)
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

  // updateUsers(data:UpdateProductsDTO,id:number){
  //   return this.http.patch<Users>(`${this.apiUrl}customer_user/${id}/`, data)
  //   .pipe(
  //     retry(3),
  //     catchError((error:HttpErrorResponse) => {
  //       if(error.status===HttpStatusCode.Conflict){
  //         return throwError('Algo está fallando en el servidor');
  //       }
  //       if(error.status===HttpStatusCode.BadRequest){
  //         return throwError('Está realizando una mala petición')
  //       }
  //       if(error.status===HttpStatusCode.NotFound){
  //         return throwError('La página no ha sido encontada')
  //       }
  //       if(error.status===HttpStatusCode.Unauthorized){
  //         return throwError('No estás autorizado')
  //       }
  //       return throwError('Algo está saliendo mal')
  //     })
  //   );
  // }
}
