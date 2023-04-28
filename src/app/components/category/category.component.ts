import { Component, Input, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category, UpdateaCategoryDTO } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})

export class CategoryComponent {
  formCategory!: FormGroup;

  @Input() categories: Category[] = [];
  @Output() modalStateEvent= new EventEmitter<boolean>();
  modalState=true;

  messagges='';
  statusCode=0;
  statusDeatil:'Loading' | 'Success' | 'Error'| 'Init' = 'Init'

  category:Category={
    id:0,
    category:"",
  }

  //this is the categories form
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

  //this function is for send modal State to products component
  sendModalState(){
    this.modalState =false;
    this.modalStateEvent.emit(this.modalState);
    this.getAllCategories();
  }

  //this function get all categories
  getAllCategories() {
    this.categoryService.getAllCategories()
      .subscribe(data =>{
        this.categories=data
      });
  }

  //this function is for send categories data base
  submit(event: Event) {
    event.preventDefault()
    this.statusDeatil='Loading';
    const addCategory = this.formCategory.value;
    if (this.formCategory.valid) {
      this.categoryService.createCategory(addCategory)
        .subscribe(data=>{
          this.getAllCategories();
          Swal.fire({
            icon: 'success',
            confirmButtonText: 'Regresar',
            title: 'Categoría agregada con éxito',
            html: `La categoría: <strong>${data.category}</strong> fue agregada con éxito`,
          })
        },()=>{
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

  //this function is for update categories in data base
  updateCategory() {
    this.statusDeatil='Loading';
    const updateCategory: UpdateaCategoryDTO = this.formCategory.value;
    if (this.formCategory.valid) {
      this.categoryService.updateCategory(this.category.id, updateCategory)
        .subscribe(() => {
          this.getAllCategories();
        },()=>{
          this.statusDeatil='Error';
          this.messagges=`Ocurrió un error ${this.statusDeatil}`;
          this.formCategory.markAllAsTouched();
        });
        this.formCategory.reset();
        this.statusDeatil='Success';
        Swal.fire({
          icon: 'success',
          confirmButtonText: 'Regresar',
          title: 'Categoría modificada con éxito',
          html: `La categoría: <strong>${this.category.category}</strong> fue modificada con éxito`,
        })
        this.category={
          id:0,
          category:"",
        }
    } else {
      this.statusDeatil='Error';
      this.messagges=`Ocurrió un error ${this.statusDeatil}`;
      this.formCategory.markAllAsTouched();
    }
  }

  //this function is for send item to categories form for update
  toggleUpdate(item: Category) {
    this.statusDeatil='Loading';
    this.category=item;
    if(item.id){
      this.categoryService.getCategory(item.id)
      .subscribe(data => {
        this.formCategory.patchValue(data);
      },()=>{
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

  //this function is for delete categories in data base
  toggleDelete(item: Category) {
    this.statusDeatil='Loading';
    if(item.id){
      this.categoryService.deleteCategory(item.id)
        .subscribe(() => {
          this.getAllCategories();
          },()=>{
            this.statusDeatil='Error';
            this.messagges=`Ocurrió un error ${this.statusDeatil}`;
            this.formCategory.markAllAsTouched();
        });
        Swal.fire({
          icon: 'success',
          confirmButtonText: 'Regresar',
          title: 'Categoría eliminada con éxito',
          html: `La categoría: <strong>${item.category}</strong> fue eliminada con éxito`,
        })
      this.statusDeatil='Success';
    }else{
      this.statusDeatil='Error';
      this.messagges=`Ocurrió un error ${this.statusDeatil}`;
      this.formCategory.markAllAsTouched();
    }
  }
}
