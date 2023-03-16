import { Component, OnChanges, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category, UpdateaCategoryDTO } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import {switchMap,mergeMap} from 'rxjs/operators'
import {zip} from 'rxjs'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  formCategory!: FormGroup;

  @Input() categories: Category[] = [];
  @Output() modalStateEvent= new EventEmitter<boolean>();
  modalState:boolean=true;

  toggleState:number=0;
  selectedCategoryId: number = 0;
  messagges:string='';
  statusCode: number=0;
  statusDeatil:'Loading' | 'Success' | 'Error'| 'Init' = 'Init'

  category:Category={
    id:0,
    category:"",
  }

  private formAddCategory() {
    this.formCategory = this.formBuilder.group({
      category: ['', [Validators.required]],
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.formAddCategory();
  }

  sendModalState(){
    this.modalState =!this.modalState;
    this.modalStateEvent.emit(this.modalState);
  }

  getAllCategories() {
    this.categoryService.getAllCategories()
      .subscribe(data =>{
        this.categories=data
      });
  }


  submit(event: Event) {
    this.statusDeatil='Loading';
    const addCategory = this.formCategory.value;
    if (this.formCategory.valid) {
        this.categoryService.createCategory(addCategory)
        .subscribe(data=>{
          this.getAllCategories();
        })
        this.statusDeatil='Success';
        this.formCategory.reset();
      }
      else {
        this.statusDeatil='Error';
        this.formCategory.markAllAsTouched();
    }
  }


  updateCategory() {
    this.statusDeatil='Loading';
    const updateCategory: UpdateaCategoryDTO = this.formCategory.value;
    if (this.formCategory.valid) {
      this.categoryService
        .updateCategory(this.selectedCategoryId, updateCategory)
        .subscribe((data) => {
          this.getAllCategories();
          this.messagges=`La Categoría ${data.category} fue modificada con éxito `;
        });
      this.formCategory.reset();
      this.statusDeatil='Success';
    } else {
      this.formCategory.markAllAsTouched();
      this.statusDeatil='Error';
    }
  }

  toggleUpdate(item: Category) {
    this.statusDeatil='Loading';
    this.toggleState=item.id
    if(item.id){
      this.categoryService.getCategory(item.id)
      .subscribe(data => {
        this.formCategory.patchValue(data);
        this.selectedCategoryId = data.id;
      });
      this.statusDeatil='Success';
    }else{
      this.statusDeatil='Error';
    }
  }

  toggleDelete(item: Category) {
    this.statusDeatil='Loading';
    if(item.id){
      this.categoryService.deleteCategory(item.id).subscribe(data => {
        this.getAllCategories();

      });
      this.statusDeatil='Success';
    }else{
      this.statusDeatil='Error';
    }
  }
}
