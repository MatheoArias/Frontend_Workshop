import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.models';



@Injectable({
  providedIn: 'root'
})
export class TokenService {

  saveToken(token:string){
    localStorage.setItem('token', token);
  }

  getToken(){
    const token=localStorage.getItem('token')
    return token;
  }

  saveUser(user:Auth){
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(){
    const user=localStorage.getItem('user');
    return user;
  }

}
