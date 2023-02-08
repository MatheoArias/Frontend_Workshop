import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Category } from '../models/category.model';
import { CreateCategoryDTO,UpdateaCategoryDTO } from '../models/category.model';
import {environment} from '../../enviroments/environment'


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
  }

  getCategory(id:number){
    return this.http.get<Category>(`${this.apiUrl}${id}/`)
  }

  createCategory(data:CreateCategoryDTO){
    return this.http.post<Category>(this.apiUrl, data)
  }

  updateCategory(id:number, data:UpdateaCategoryDTO){
    return this.http.put<Category>(`${this.apiUrl}${id}/`, data)
  }

  deleteCategory(id:number){
    return this.http.delete<Category>(`${this.apiUrl}${id}/`)
  }
}
