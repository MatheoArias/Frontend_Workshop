import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { CreateUsersDto,GetAllUsers,Users,UpdateProductsDTO } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = `${environment.API_URL}/users`
  constructor(
    private http: HttpClient
  ) {}

  createUser(dto:CreateUsersDto){
    return this.http.post<Users>(`{this.apiUrl}/add_user`, dto)
  }

  getAllUsers(dto:GetAllUsers){
    return this.http.get<Users>(`{this.apiUrl}/customer_user`)
  }

  deleteUsers(id:number){
    return this.http.delete<Users>(`{this.apiUrl}/add_user/{id}`)
  }

  updateUsers(dto:UpdateProductsDTO,id:number){
    return this.http.patch<Users>(`{this.apiUrl}/add_user/{id}`,id)
  }
}
