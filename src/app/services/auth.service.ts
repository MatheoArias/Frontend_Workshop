import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../models/auth.models';
import { TokenService } from './token.service';
import { tap } from 'rxjs';

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
        username:username,
        password:password
      }
    ).pipe(
      tap(data=>this.tokenService.saveToken(data.token))
  )};

  logout(id:number) {
    return this.http.post<Auth>(this.apiUrlLogout,
      {
        user:id,
      }
  )};

}
