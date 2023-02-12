import { Component,OnInit, Output } from '@angular/core';
import { Product} from 'src/app/models/product.model';
import { CreateProductsDTO,UpdateProductsDTO } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import {switchMap} from 'rxjs/operators'
import {zip} from 'rxjs'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  selectedProductId:number=0;
  messagges:string='';

  ///****Table values
  displayedColumns: string[] = ['code', 'category', 'description','unitValue', 'totalStock','toggleUpdate','toggleDelete'];
  dataSource = this.products

  formProduct!: FormGroup;
  get category_id() {
    return this.formProduct.get('category_id');
  }
  get code() {
    return this.formProduct.get('code');
  }
  get description() {
    return this.formProduct.get('description');
  }
  get unit_value(){
    return this.formProduct.get('unit_value');
  }
  get totals_stock() {
    return this.formProduct.get('totals_stock');
  }
  private formAddProduct() {
    this.formProduct = this.formBuilder.group({
      category_id: ['', [Validators.required]],
      code: ['', [Validators.required]],
      description: ['', [Validators.required]],
      unit_value: ['', [Validators.required]],
      totals_stock: ['', [Validators.required]],
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private ProductService: ProductService,
    private categoryService:CategoryService
  ) {
    this.formAddProduct();
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(
      data=>{
        this.categories = data;
      }
    )
  }

  getAllProducts(){
    this.ProductService.getAllProducts().subscribe(
      data=>{
        this.products = data;
      }
    );
  }

  updateProduct(){
    const addProduct:UpdateProductsDTO=this.formProduct.value
    if (this.formProduct.valid) {
      this.ProductService.updateProduct(this.selectedProductId,addProduct).subscribe(
        data=>{
          this.getAllProducts();
          this.messagges=`La Categoría ${data.description} con código ${data.code} fue modificado con éxito `;
        }
      )
      this.formProduct.reset();
    } else {
      this.formProduct.markAllAsTouched();
    }
  }

  toggleUpdate(item: Product){
    this.ProductService.getProduct(item.id).subscribe(
      data=>{
        this.formProduct.patchValue(data);
        this.category_id?.setValue(data.category_id.id);
        this.selectedProductId = data.id
      }
    )
  }

  toggleDelete(item: Product){
    this.ProductService.deleteProduct(item.id).subscribe();
  }

  submit(event: Event) {
    event.preventDefault();
    const addProduct:CreateProductsDTO=this.formProduct.value
    if (this.formProduct.valid) {
      this.ProductService.createProduct(addProduct).subscribe(data=>{
        this.getAllProducts();
        this.messagges=`La Categoría ${data.description} con código ${data.code} fue agregado con éxito `;
      });
      this.formProduct.reset();
    } else {
      this.formProduct.markAllAsTouched();
    }
  }

}
