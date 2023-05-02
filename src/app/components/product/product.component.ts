import { Component,OnInit} from '@angular/core';
import { Product} from 'src/app/models/product.model';
import { CreateProductsDTO,UpdateProductsDTO } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { CurrencyPercentPipe } from 'src/app/pipes/currency-percent.pipe';
import { zip } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})

export class ProductComponent implements OnInit{

  modalState=false;
  products: Product[] = [];
  categories: Category[] = [];

  //This is the total price sell in theform bottom
  priceSell=0;
  product:Product={
    id: 0,
    category_id: {
      id:0,
      category: ''
    },
    code: '',
    description: '',
    unit_value:0,
    totals_stock: 0,
    percentage:0,
  }

  statusDeatil:'Loading' | 'Success' | 'Error'| 'Init' = 'Init';
  itemFind="";
  listFilter:Product[]=[];

  //these are pipes
  filterpipe= new FilterPipe();
  currencyPercent=new CurrencyPercentPipe();

  //this is the producst form
  formProduct!: FormGroup;
  get category() {
    return this.formProduct.get('category_id');
  }
  get code() {
    return this.formProduct.get('code');
  }
  get description() {
    return this.formProduct.get('description');
  }
  get unitValue(){
    return this.formProduct.get('unit_value');
  }
  get totalStock() {
    return this.formProduct.get('totals_stock');
  }
  get percentage(){
    return this.formProduct.get('percentage');
  }
  private formAddProduct() {
    this.formProduct = this.formBuilder.group({
      category_id: ['', [Validators.required]],
      code: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(7)]],
      description: ['', [Validators.required,Validators.maxLength(200)]],
      unit_value: ['', [Validators.required]],
      totals_stock: ['', [Validators.required]],
      percentage:['', [Validators.required]]
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

  //this function recive the event that send category component
  reciveToggleModal(event:boolean){
    this.modalState = event;
  }

  //this function activate modal event
  toggleModal(){
    this.modalState=!this.modalState;
    this.getAllCategories();
  }

  //this function get all categories
  getAllCategories(){
    this.categoryService.getAllCategories()
    .subscribe(
      data=>{
        this.categories = data;
      }
    )
  }

  //this function get all product
  getAllProducts(){
    this.ProductService.getAllProducts()
    .subscribe(
      data=>{
        this.products = data;
        this.listFilter=data;
      }
    );
  }

  //This is for generate product's code automatically
  //this function get the last code for category and add one unit to last digit of code
  getLastCode(){
    zip(
      this.ProductService.getAllProducts(),
      this.categoryService.getAllCategories()
    )
    .subscribe(
      data=>{
        const lastProduct:Product[]=data[0]
          .filter(item=>item.category_id.id==this.category?.value)
          .sort((a,b)=>b.id-a.id);
        if(lastProduct.length>0){
          const lastCode=parseInt(lastProduct[0].code.split('')[6])+1
          this.code?.setValue(lastProduct[0].code.slice(0,-1) + lastCode.toLocaleString());
        }else{
          const categories=data[1]
            .filter(item=>item.id==this.category?.value);
          const category=categories[0].category.replace(/[aeiou]/gi, "").split('')
          this.code?.setValue(`${category[0].toUpperCase()}${category[1].toUpperCase()}00001`);
        }
      }
    );
  }

  //This function is for add products in data base
  //category_id: 1 - number -this is the category id
  //code: MT001 - string,
  //description: Farola - String,
  //unit_value: 15000 - number,
  //totals_stock: 15 - number,
  //percentage: 45 /100 *** This number come of  input component

  submit(event: Event) {
    event.preventDefault();
    this.statusDeatil='Loading';
    const addProduct:CreateProductsDTO={
        category_id: this.category?.value,
        code: this.code?.value,
        description: this.description?.value,
        unit_value:this.unitValue?.value,
        totals_stock: this.totalStock?.value,
        percentage:this.percentage?.value/100
    }
    if (this.formProduct.valid) {
      this.ProductService.createProduct(addProduct)
        .subscribe(()=>{
        this.getAllProducts();
      },()=>{
        Swal.fire({
          icon: 'error',
          confirmButtonText: 'Regresar',
          title: 'Error',
          html: `ha ocurrido un error en el momento de agregar el producto`,
        })
        this.statusDeatil='Error';
      });
      Swal.fire({
        icon: 'success',
        confirmButtonText: 'Regresar',
        title: 'Producto agregado con éxito',
        html: `El producto: <strong>${addProduct.description}</strong> fue agregado con éxito`,
      })
      this.statusDeatil='Success';
      this.formProduct.reset();
      this.priceSell=0;
    } else {
      Swal.fire({
        icon: 'error',
        confirmButtonText: 'Regresar',
        title: 'Error',
        html: `Ocurrio un error al llenar el formulario`,
      })
      this.statusDeatil='Error';
      this.formProduct.markAllAsTouched();
    }
  }

  //this function is for update products in data
  //id: 1 -number  -this is the products id
  //category_id: 1 - number -this is the category id
  //code: MT001 - string,
  //description: Farola - String,
  //unit_value: 15000 - number,
  //totals_stock: 15 - number,
  //percentage: 45 /100 *** This number come of  input component
  updateProduct(){
    this.statusDeatil='Loading';
    const addProduct:UpdateProductsDTO={
        id:this.product.id,
        category_id: this.category?.value,
        code: this.code?.value,
        description: this.description?.value,
        unit_value:this.unitValue?.value,
        totals_stock: this.totalStock?.value,
        percentage:this.percentage?.value/100
    }
    if (this.formProduct.valid) {
      this.ProductService.updateProduct(this.product.id,addProduct)
      .subscribe(()=>{
          this.getAllProducts();
        },()=>{
          Swal.fire({
            icon: 'error',
            confirmButtonText: 'Regresar',
            title: 'Error',
            html: `ha ocurrido un error en el momento de modificar el producto`,
          })
          this.statusDeatil='Error';
        })
      Swal.fire({
        icon: 'success',
        confirmButtonText: 'Regresar',
        title: 'Producto modificado con éxito',
        html: `El producto: <strong>${addProduct.description}</strong> fue modificado con éxito`,
      })
      this.statusDeatil='Success';
      this.formProduct.reset();

      this.product={
        id: 0,
        category_id: {
          id:0,
          category: ''
        },
        code: '',
        description: '',
        unit_value:0,
        totals_stock: 0,
        percentage:0,
      }

    } else {
      Swal.fire({
        icon: 'error',
        confirmButtonText: 'Regresar',
        title: 'Error',
        html: `Ocurrio un error al llenar el formulario`,
      })
      this.statusDeatil='Error';
      this.formProduct.markAllAsTouched();
    }
  }

  //this function is for add items at products form for update
  toggleUpdate(item: Product){
    this.statusDeatil='Loading';
    this.product=item;
    this.ProductService.getProduct(item.id).subscribe(
      data=>{
        this.formProduct.patchValue(data);
        this.category?.setValue(data.category_id);
        this.percentage?.setValue(data.percentage*100)
        this.priceSell=((this.percentage?.value/100)*this.unitValue?.value)+this.unitValue?.value
        this.statusDeatil='Success';
      },()=>{
        Swal.fire({
          icon: 'error',
          confirmButtonText: 'Regresar',
          title: 'Error',
          html: `ha ocurrido un error en el momento de seleccionar el producto`,
        })
        this.statusDeatil='Error';
      }
    )
  }

  //this function id for delete products in data base
  toggleDelete(item: Product){
    this.statusDeatil = 'Loading';
    if(item){
      this.ProductService.deleteProduct(item.id)
      .subscribe(()=>{
        this.getAllProducts();
        this.statusDeatil = 'Success';
        Swal.fire({
          icon: 'success',
          confirmButtonText: 'Regresar',
          title: 'Producto eliminado con éxito',
          html: `El producto: <strong>${item.description}</strong> fue eliminado con éxito`,
        })
      },()=>{
        Swal.fire({
          icon: 'error',
          confirmButtonText: 'Regresar',
          title: 'Error',
          html: `ha ocurrido un error en el momento de eliminar el producto`,
        })
        this.statusDeatil='Error';
      });
    }else{
      Swal.fire({
        icon: 'error',
        confirmButtonText: 'Regresar',
        title: 'Error',
        html: `Ocurrio un error al llenar el formulario`,
      })
      this.statusDeatil='Error';
    }
  }


  reciveValueFind(item: string){
    this.product={
      id: 0,
      category_id: {
        id:0,
        category: ''
      },
      code: '',
      description: '',
      unit_value:0,
      totals_stock: 0,
      percentage:0,
    }
    if(item){
      this.itemFind=item
      this.listFilter=this.filterpipe.transform(this.products,item);
    }else{
      this.itemFind="";
    }
  }

  //this funtion is for to change the price value in the html
  onChangeSellPrice(){
    this.priceSell=((this.percentage?.value/100)*this.unitValue?.value)+this.unitValue?.value
  }
}
