import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse,HttpStatusCode} from '@angular/common/http';
import { Category } from '../models/category.model';
import { CreateCategoryDTO,UpdateaCategoryDTO } from '../models/category.model';
import {environment} from '../../enviroments/environment'
import {retry,catchError} from 'rxjs/operators'
import {throwError} from 'rxjs'


@Injectable({
  providedIn: 'root'

})
export class CategoryService {

  private apiUrl = `${environment.API_URL}/categories/add_category/`

  constructor(
    private http: HttpClient,
  ) { }

  getAllCategories(
  ){
    return this.http.get<Category[]>(this.apiUrl)
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

  getCategory(id:number){
    return this.http.get<Category>(`${this.apiUrl}${id}/`)
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

  createCategory(data:CreateCategoryDTO){
    return this.http.post<Category>(this.apiUrl, data)
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

  updateCategory(id:number, data:UpdateaCategoryDTO){
    return this.http.put<Category>(`${this.apiUrl}${id}/`, data)
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

  deleteCategory(id:number){
    return this.http.delete<Category>(`${this.apiUrl}${id}/`)
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
