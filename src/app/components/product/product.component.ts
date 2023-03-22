import { Component,OnInit, Input,Output,EventEmitter } from '@angular/core';
import { Product} from 'src/app/models/product.model';
import { CreateProductsDTO,UpdateProductsDTO } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';
import { FormGroup,FormBuilder, Validators, FormControl} from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit{

  products: Product[] = [];
  categories: Category[] = [];

  productId:number=0;
  messagges:string='';
  statusCode: number=0;
  statusDeatil:'Loading' | 'Success' | 'Error'| 'Init' = 'Init';
  valueFind=new FormControl('');
  itemFind:string="";
  filterpipe= new FilterPipe()
  listFilter:Product[]=[];

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
    private categoryService:CategoryService,
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
        this.listFilter=data;
      }
    );
  }

  submit(event: Event) {
    event.preventDefault();
    this.statusDeatil='Loading';
    const addProduct:CreateProductsDTO=this.formProduct.value
    if (this.formProduct.valid) {
      this.ProductService.createProduct(addProduct).subscribe(data=>{
        this.getAllProducts();
        this.messagges=`El producto ${data.description} con código ${data.code} fue agregado con éxito `;
      });
      this.statusDeatil='Success';
      this.formProduct.reset();
    } else {
      this.statusDeatil='Error';
      this.messagges=`Ocurrió un error ${this.statusDeatil}`;
      this.formProduct.markAllAsTouched();
    }
  }

  updateProduct(){
    this.statusDeatil='Loading';
    const addProduct:UpdateProductsDTO=this.formProduct.value
    if (this.formProduct.valid) {
      this.ProductService.updateProduct(this.productId,addProduct).subscribe(
        data=>{
          this.getAllProducts();
          this.messagges=`El producto ${data.description} con código ${data.code} fue modificado con éxito`;
        }
      )
      this.statusDeatil='Success';
      this.formProduct.reset();
      this.productId=0;
    } else {
      this.statusDeatil='Error';
      this.messagges=`Ocurrió un error ${this.statusDeatil}`;
      this.formProduct.markAllAsTouched();
    }
  }

  toggleUpdate(item: Product){
    this.statusDeatil='Loading';
    this.productId = item.id
    this.ProductService.getProduct(item.id).subscribe(
      data=>{
        this.formProduct.patchValue(data);
        this.category_id?.setValue(data.category_id.id);
        this.statusDeatil='Success';
      },(error)=>{
        this.statusDeatil='Error';
        this.messagges=`Ocurrió un error ${this.statusDeatil}`;
        this.formProduct.markAllAsTouched();
      }
    )
  }

  toggleDelete(item: Product){
    this.statusDeatil = 'Loading';
    if(item){
      this.ProductService.deleteProduct(item.id)
      .subscribe(data=>{
        this.getAllProducts();
        this.statusDeatil = 'Success';
        this.messagges=`El producto ${data.description} con código ${data.code} fue eliminado con éxito`;
      },error=>{
        this.statusDeatil='Error';
        this.messagges=`Ocurrió un error ${this.statusDeatil}`;
        this.formProduct.markAllAsTouched();
      });
    }else{
      this.statusDeatil='Error';
      this.messagges=`Ocurrió un error ${this.statusDeatil}`;
      this.formProduct.markAllAsTouched();
    }
  }

  onChangeText(){
    if(this.valueFind.value){
      this.itemFind=this.valueFind.value;
      this.listFilter=this.filterpipe.transform(this.products,this.itemFind);
      this.productId=0;
    }else{
      this.itemFind="";
    }
  }
}
