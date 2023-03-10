import { Component,OnInit, Input,Output,EventEmitter } from '@angular/core';
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
export class ProductComponent implements OnInit{
  products: Product[] = [];
  categories: Category[] = [];
  radioState:string='';

  selectedProductId:number=0;
  messagges:string='';
  statusCode: number=0;
  statusDeatil:'Loading' | 'Success' | 'Error'| 'Init' = 'Init';


  modalState:boolean=false;
  @Output() modalStateEvent=new EventEmitter();

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

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }


  reciveToggleModal(event:boolean){
    this.modalState = event;
  }

  toggleModal(){
    this.modalState=!this.modalState;
    this.getAllCategories();
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

  submit(event: Event) {
    event.preventDefault();
    const addProduct:CreateProductsDTO=this.formProduct.value
    if (this.formProduct.valid) {
      this.ProductService.createProduct(addProduct).subscribe(data=>{
        this.getAllProducts();
        this.messagges=`La Categor??a ${data.description} con c??digo ${data.code} fue agregado con ??xito `;
      });
      this.formProduct.reset();
    } else {
      this.formProduct.markAllAsTouched();
    }
  }

  updateProduct(){
    const addProduct:UpdateProductsDTO=this.formProduct.value
    if (this.formProduct.valid) {
      this.ProductService.updateProduct(this.selectedProductId,addProduct).subscribe(
        data=>{
          this.getAllProducts();
          this.messagges=`La Categor??a ${data.description} con c??digo ${data.code} fue modificado con ??xito `;
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

}
