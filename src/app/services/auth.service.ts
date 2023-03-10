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
  private apiUrl = `${environment.API_URL}/login`
  constructor(
    private http:HttpClient,
    private tokenService:TokenService
  ) { }

  login(username:string,password:string){
    return this.http.post<Auth>(this.apiUrl,
      {
        username:username,
        password:password
      }
    ).pipe(
      tap(data=>this.tokenService.saveToken(data.token))
    );
  }
}
