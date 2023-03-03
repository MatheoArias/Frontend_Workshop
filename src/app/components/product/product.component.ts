import { Component,OnInit, Input,Output } from '@angular/core';
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
export class ProductComponent{
  @Input() products: Product[] = [];
  @Input() categories: Category[] = [];
  radioState:string='';

  selectedProductId:number=0;
  messagges:string='';
  statusCode: number=0;
  statusDeatil:'Loading' | 'Success' | 'Error'| 'Init' = 'Init'

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
      unit_value: [0, [Validators.required]],
      totals_stock: [0, [Validators.required]],
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private ProductService: ProductService,
    private categoryService:CategoryService
  ) {
    this.formAddProduct();
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
    this.radioState = item.code
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
