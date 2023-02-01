import { Component,OnInit, Output } from '@angular/core';
import { Product} from 'src/app/models/product.model';
import { CreateProductsDTO,UpdateProductsDTO } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.models';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  selectedProductId:number=0;

  ///****Table values
  displayedColumns: string[] = ['productCode', 'productCategory', 'description', 'stock','toggleUpdate','toggleDelete'];
  dataSource = this.products

  formProduct!: FormGroup;
  get product_category_id() {
    return this.formProduct.get('product_category_id');
  }
  get product_code() {
    return this.formProduct.get('product_code');
  }
  get product_description() {
    return this.formProduct.get('product_description');
  }
  get totals_stock() {
    return this.formProduct.get('totals_stock');
  }
  private formAddProduct() {
    this.formProduct = this.formBuilder.group({
      product_category_id: ['', [Validators.required]],
      product_code: ['', [Validators.required]],
      product_description: ['', [Validators.required]],
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
    this.categoryService.getAllCategories().subscribe(
      data=>{
        this.categories = data;
      }
    )
  }

  updateProduct(){
    const addProduct:UpdateProductsDTO=this.formProduct.value
    if (this.formProduct.valid) {
      this.ProductService.updateProduct(this.selectedProductId,addProduct).subscribe()
      this.formProduct.reset();
    } else {
      this.formProduct.markAllAsTouched();
    }

  }

  toggleUpdate(item: Product){
    this.ProductService.getProduct(item.id).subscribe(
      data=>{
        this.formProduct.patchValue(data);
        this.product_category_id?.setValue(data.product_destination_id.id);
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
      this.ProductService.createProduct(addProduct).subscribe();
      this.formProduct.reset();
    } else {
      this.formProduct.markAllAsTouched();
    }
  }

}
