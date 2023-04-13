import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Product} from 'src/app/models/product.model';
import {BuyProducts,UpdateBuysProductDTO,createBuysProductDTO} from 'src/app/models/buy_product.model';
import { BuyProductsService } from 'src/app/services/buy-products.service';
import { ProductService } from 'src/app/services/product.service';
import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buys-products',
  templateUrl: './buys-products.component.html',
  styleUrls: ['./buys-products.component.scss'],
})

export class BuysProductsComponent implements OnInit {

  dateNow: Date = new Date();
  value: any | null = 0;
  total_buy_value:number=0;
  lastValueProduct:number=0;

  filterpipe = new FilterPipe();
  itemFind: string = "";
  valueFind = new FormControl('');
  listFilter:Product[] = [];
  choiceProduct=new FormControl('')

  messagges: string = '';
  statusCode: number = 0;
  statusDeatil: 'Loading' | 'Success' | 'Error' | 'Init' = 'Init';

  //this is the section of initialaizing products.
  addProductsList:Product[]=[];
  products: Product[] = [];
  product:Product={
    id: 0,
    category_id: {
      id:0,
      category:''
    },
    code: '',
    description:'',
    unit_value:0,
    totals_stock: 0,
  }

  //this is the section of initialaizing Buy products.
  buysProducts: BuyProducts[] = [];
  buysProductsList: BuyProducts[] = [];
  buysProductsListDTO: createBuysProductDTO[] = [];
  buysProduct: BuyProducts = {
    id: 0,
    product_id: {
      id: 0,
      category_id: {
        id: 0,
        category: '',
      },
      code: '',
      description: '',
      unit_value: 0,
      totals_stock: 0,
    },
    buys_date: new Date(),
    buys_bill: '',
    buys_stock: 0,
    buys_unit_value: 0,
  };

  buysProductDTO: createBuysProductDTO = {
    product_id:0,
    buys_date: new Date(),
    buys_bill: '',
    buys_stock: 0,
    buys_unit_value: 0,
  };

  //this is the form to add buys products to the api services
  formBuysProduct!: FormGroup;
  get buysDate() {
    return this.formBuysProduct.get('buys_date');
  }
  get buysBill() {
    return this.formBuysProduct.get('buys_bill');
  }
  private formAddBuysProduct() {
    this.formBuysProduct = this.formBuilder.group({
      buys_date: ['', [Validators.required]],
      buys_bill: ['', [Validators.required]],
    });
  }

  //this is the form to add buys products to the list
  formlistBuyProducts!:FormGroup;
  get buyUnitValue() {
    return this.formlistBuyProducts.get('buy_unit_value');
  }
  get cuantity() {
    return this.formlistBuyProducts.get('cuantity');
  }
  private formAddListBuysProduct() {
    this.formlistBuyProducts = this.formBuilder.group({
      buy_unit_value: [, [Validators.required]],
      cuantity: [, [Validators.required]],
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private buyProductsService: BuyProductsService,
  ) {
    this.formAddBuysProduct();
    this.formAddListBuysProduct();
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllBuyProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts()
    .subscribe(data => {
      this.products = data;
      this.listFilter=data;
    });
  }

  getAllBuyProducts() {
    this.buyProductsService.getAllBuyProducts()
    .subscribe(data => {
      this.buysProducts = data;
    });
  }

  submit(event: Event) {
    event.preventDefault();
    if (this.formBuysProduct.valid && this.addProductsList.length>0) {
      this.buysProductsListDTO.map(item => {
        zip(
          this.buyProductsService.createBuyProduct(item),
          this.productService.getProduct(item.product_id)
        )
          .pipe(
            switchMap((item) =>
              this.productService.updateTotalStockProduct(item[1].id, {
                totals_stock: item[1].totals_stock + item[0].buys_stock,
              })
            )
          )
          .subscribe(
            data=>{
              this.getAllProducts();
            }
          )
      })

      Swal.fire({
        icon: 'success',
        confirmButtonText: 'regresar',
        title: 'Productos agregados con éxitos',
        html: `La factura: <strong>${this.buysProductsList[0].buys_bill}</strong> fue agregada con éxito`,
      })

      this.formBuysProduct.reset();
      this.formlistBuyProducts.reset();
      this.buysProductsList=[];
      this.buysProductsListDTO=[];
      this.addProductsList=[];

    } else {
      Swal.fire({
        icon: 'error',
        confirmButtonText: 'Regresar',
        title: '¡ Fíjate en los productos!',
        html:
         `Deberías agregar algunos productos:
         <br><br>
            <strong>1.</strong> Busque el producto en la sección correspondiente<br>
            <strong>2.</strong> Haga click sobre este.<br>
            <strong>3.</strong> Ingrese el valor y la cantidad de compra<br>
            <strong>4.</strong> Presione agregar.<br>
            <strong>5.</strong> Repita esta acción las veces que sea necesario<br>`,
      })
      this.statusDeatil = 'Error';
      this.formBuysProduct.markAllAsTouched();
    }
  }


  //this is the function fot make the search in product's list
  onChangeText() {
    if (this.valueFind.value) {
      this.itemFind = this.valueFind.value;
      this.listFilter = this.filterpipe.transform(this.products, this.itemFind);
    } else {
      this.itemFind = "";
    }
  }

  /*this is the funcion for add product's id in the list*/
  onClickListProducts(item: Product) {
    let index = this.addProductsList.map(product => product).indexOf(item);
    if (index != -1) {
      Swal.fire({
        icon: 'error',
        confirmButtonText: 'Regresar',
        title: '¡ Fíjate en los productos!',
        html:
         `Ya habías agregado este producto.<br>
          Cierre esta ventana y busquelo en la lista de productos agregados`,
      })
    } else {
      this.product = item;
      this.buyProductsService.getAllBuyProducts()
      .subscribe(data=>{
        let buyproductSelectedList=data
          .filter(buyProduct=>buyProduct.product_id.id==item.id)
          .sort((a,b)=>b.buys_unit_value-a.buys_unit_value);
        if(buyproductSelectedList.length>0){
          this.lastValueProduct=buyproductSelectedList[0].buys_unit_value;
          this.buyUnitValue?.setValue(buyproductSelectedList[0].buys_unit_value);
        }else{
          this.buyUnitValue?.setValue(item.unit_value);
          this.lastValueProduct=item.unit_value;
        }
      })
    }
  }

  // this is the button delete buy products in the list
  toggleDelete(item: BuyProducts) {

    const index = this.buysProductsList
      .map(product => product).indexOf(item);

    if (index != -1) {
      this.buysProductsList.splice(index, 1);
      this.buysProductsListDTO .splice(index, 1);
      this.addProductsList.splice(index, 1);

      this.total_buy_value = this.buysProductsListDTO
        .reduce((sum, item) => sum + (item.buys_stock* item.buys_unit_value),0);
    }
    console.log(this.addProductsList);
  }

  // this is the button add buy products in the list
  onClickAddProductList(item:Product){
    const index = this.addProductsList
      .map(product => product).indexOf(item)
    if(index===-1){
      this.buysProductDTO={
        product_id:this.product.id,
        buys_date: this.buysDate?.value,
        buys_bill: this.buysBill?.value,
        buys_stock: this.cuantity?.value,
        buys_unit_value: this.buyUnitValue?.value,
      }

      this.buysProduct={
        id:0,
        product_id:{
          id: item.id,
          category_id: item.category_id,
          code: item.code,
          description: item.description,
          unit_value:this.buyUnitValue?.value,
          totals_stock: item.totals_stock,
        },
        buys_date: this.buysDate?.value,
        buys_bill: this.buysBill?.value,
        buys_stock: this.cuantity?.value,
        buys_unit_value: this.buyUnitValue?.value,
      }

      this.product={
        id: 0,
        category_id: {
          id:0,
          category:''
        },
        code: '',
        description:'',
        unit_value:0,
        totals_stock: 0,
      }

      this.addProductsList.push(item);
      this.buysProductsListDTO.push(this.buysProductDTO);
      this.buysProductsList.push(this.buysProduct);
      this.total_buy_value = this.buysProductsListDTO
        .reduce((sum, item) => sum + (item.buys_stock* item.buys_unit_value),0);
      this.formlistBuyProducts.reset();
      this.choiceProduct.reset();

    }
  }
}
