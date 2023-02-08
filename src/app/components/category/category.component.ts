import { Component, OnChanges, OnInit, Input } from '@angular/core';
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
  selectedCategoryId: number = 0;
  messagges:string='';
  statusCode: number=0;

  displayedColumns: string[] = ['category', 'toggleUpdate', 'toggleDelete'];
  dataSource = this.categories;

  get category() {
    return this.formCategory.get('category');
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

  getAllCategories() {
    this.categoryService
      .getAllCategories()
      .subscribe((data) => (this.categories = data));
  }

  updateCategory() {
    const updateCategory: UpdateaCategoryDTO = this.formCategory.value;
    if (this.formCategory.valid) {
      this.categoryService
        .updateCategory(this.selectedCategoryId, updateCategory)
        .subscribe((data) => {
          this.getAllCategories();
          this.messagges=`La Categoría ${data.category} fue modificada con éxito `;
        });
      this.formCategory.reset();
    } else {
      this.formCategory.markAllAsTouched();
    }
  }

  toggleUpdate(item: Category) {
    this.categoryService.getCategory(item.id).subscribe((data) => {
      this.formCategory.patchValue(data);
      this.selectedCategoryId = data.id;
    });
  }

  toggleDelete(item: Category) {
    this.messagges=`La Categoría ${item.category} fue eliminada con éxito `;
    this.categoryService.deleteCategory(item.id).subscribe(data => {
      this.getAllCategories();
    });
  }

  submit(event: Event) {
    const addCategory = this.formCategory.value;
    if (this.formCategory.valid) {
      this.categoryService.createCategory(addCategory).subscribe((data) => {
        this.getAllCategories();
        this.messagges=`La Categoría ${data.category} fue agregada con éxito `;
      },errorCode => this.statusCode = errorCode);
      this.formCategory.reset();
    } else {
      this.formCategory.markAllAsTouched();
    }
  }
}
