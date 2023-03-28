import { Component, OnChanges, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category, UpdateaCategoryDTO } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';


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

  categoryId: number = 0;
  messagges:string='';
  statusCode: number=0;
  statusDeatil:'Loading' | 'Success' | 'Error'| 'Init' = 'Init'

  category:Category={
    id:0,
    category:"",
  }

  get InputCategory(){
    return this.formCategory.get('category')
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
    this.modalState =false;
    this.modalStateEvent.emit(this.modalState);
    this.getAllCategories();
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
          this.messagges=`La categoria ${data.category} fue agregada con éxito`;
        },error=>{
          this.statusDeatil='Error';
          this.messagges=`Ocurrió un error ${this.statusDeatil}`;
          this.formCategory.markAllAsTouched();
        })
        this.statusDeatil='Success';
        this.formCategory.reset();
      }
      else {
        this.statusDeatil='Error';
        this.messagges=`Ocurrió un error ${this.statusDeatil}`;
        this.formCategory.markAllAsTouched();
    }
  }


  updateCategory() {
    this.statusDeatil='Loading';
    const updateCategory: UpdateaCategoryDTO = this.formCategory.value;
    if (this.formCategory.valid) {
      this.categoryService.updateCategory(this.categoryId, updateCategory)
        .subscribe((data) => {
          this.getAllCategories();
          this.messagges=`La Categoría ${data.category} fue modificada con éxito `;
        },error=>{
          this.statusDeatil='Error';
          this.messagges=`Ocurrió un error ${this.statusDeatil}`;
          this.formCategory.markAllAsTouched();
        });
      this.formCategory.reset();
      this.statusDeatil='Success';
      this.categoryId=0;
    } else {
      this.statusDeatil='Error';
      this.messagges=`Ocurrió un error ${this.statusDeatil}`;
      this.formCategory.markAllAsTouched();
    }
  }

  toggleUpdate(item: Category) {
    this.statusDeatil='Loading';
    this.categoryId=item.id;
    console.log(this.categoryId);
    if(item.id){
      this.categoryService.getCategory(item.id)
      .subscribe(data => {
        this.formCategory.patchValue(data);
        this.categoryId = data.id;
      },error=>{
        this.statusDeatil='Error';
        this.messagges=`Ocurrió un error ${this.statusDeatil}`;
        this.formCategory.markAllAsTouched();
      });
      this.statusDeatil='Success';
    }else{
      this.statusDeatil='Error';
      this.messagges=`Ocurrió un error ${this.statusDeatil}`;
      this.formCategory.markAllAsTouched();
    }
  }

  toggleDelete(item: Category) {
    this.statusDeatil='Loading';
    if(item.id){
      this.categoryService.deleteCategory(item.id)
        .subscribe(data => {
          this.getAllCategories();
          },error=>{
            this.statusDeatil='Error';
            this.messagges=`Ocurrió un error ${this.statusDeatil}`;
            this.formCategory.markAllAsTouched();
          });
      this.statusDeatil='Success';
    }else{
      this.statusDeatil='Error';
      this.messagges=`Ocurrió un error ${this.statusDeatil}`;
      this.formCategory.markAllAsTouched();
    }
  }
}
