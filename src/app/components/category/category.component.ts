import { ThisReceiver } from '@angular/compiler';
import { Component, OnChanges, OnInit ,Input} from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Category, UpdateaCategoryDTO } from 'src/app/models/category.models';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent{

  formCategory!: FormGroup;

  @Input() categories:Category[]=[];
  selectedCategoryId:number=0;

  ///****Table values
  displayedColumns: string[] = ['category', 'toggleUpdate','toggleDelete'];
  dataSource = this.categories

  get category() {
    return this.formCategory.get('category');
  }

  private formAddCategory(){
    this.formCategory=this.formBuilder.group({
      category:['',[Validators.required]],
    })
  }

  constructor(
    private formBuilder:FormBuilder,
    private categoryService:CategoryService,
  ){
    this.formAddCategory();
  }

  updateCategory(){

    const updateCategory:UpdateaCategoryDTO=this.formCategory.value
    if (this.formCategory.valid) {
      this.categoryService.updateCategory(this.selectedCategoryId,updateCategory).subscribe(data=>{
        const index=this.categories.findIndex(element=>element.id==this.selectedCategoryId)
        this.categories[index]=data
      })
      this.formCategory.reset();
    } else {
      this.formCategory.markAllAsTouched();
    }
  }

  toggleUpdate(item: Category){
    this.categoryService.getCategory(item.id).subscribe(
      data=>{
        this.formCategory.patchValue(data);
        this.selectedCategoryId = data.id
      }
    )
  }

  toggleDelete(item: Category){
    this.categoryService.deleteCategory(item.id).subscribe();
    const newArray=this.categories.filter(element=>element.id!=item.id)
    this.categories=newArray;
  }

  submit(event:Event){
    const addCategory=this.formCategory.value
    if(this.formCategory.valid){
      this.categoryService.createCategory(addCategory).subscribe();
      this.categoryService.getAllCategories().subscribe(data=>{
        this.categories=data;
      })
      this.formCategory.reset();
    }else{
      this.formCategory.markAllAsTouched()
    }
  }
}
