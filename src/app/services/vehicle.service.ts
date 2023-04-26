import { Injectable } from '@angular/core';
import { Vehicles,CreateVehiclesDTO,UpdateVehiclesDTO } from '../models/vehicle.models';
import {HttpClient,HttpErrorResponse,HttpStatusCode} from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import {retry,catchError} from 'rxjs/operators'
import {throwError} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private apiUrl = `${environment.API_URL}/vehicles/add_vehicle/`

  constructor(
    private http: HttpClient
  ) { }
  getAllVehicles(){
    return this.http.get<Vehicles[]>(this.apiUrl)
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

  getVehicle(id:number){
    return this.http.get<Vehicles>(`${this.apiUrl}${id}/`)
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

  createVehicle(data:CreateVehiclesDTO){
    return this.http.post<Vehicles>(this.apiUrl,data)
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

  updateVehicle(id:number, data:UpdateVehiclesDTO){
    return this.http.put<Vehicles>(`${this.apiUrl}${id}/`,data)
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

  deleteVehicle(id:number){
    return this.http.delete<Vehicles>(`${this.apiUrl}${id}/`)
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
