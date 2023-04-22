import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { SellProducts, CreateSellProductsDTO} from 'src/app/models/sell_product.model';
import {CreateBillDTO} from 'src/app/models/bill.models';
import { Product } from 'src/app/models/product.model';
import { Customer } from 'src/app/models/customer.model';
import { Vehicles } from 'src/app/models/vehicle.models';
import { PaymentMedium } from 'src/app/models/payment_medium.models';
import { Discounts } from 'src/app/models/discount.model';

import { ProductService } from 'src/app/services/product.service';
import { SellProductsService } from 'src/app/services/sell-products.service';
import { Employees } from 'src/app/models/employee.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import { BillService } from 'src/app/services/bill.service';

import { FilterPipe } from 'src/app/pipes/filter.pipe';
import Swal from 'sweetalert2';
import { switchMap} from 'rxjs/operators';
import { zip } from 'rxjs';

@Component({
  selector: 'app-sell-products',
  templateUrl: './sell-products.component.html',
  styleUrls: ['./sell-products.component.scss']
})

export class SellProductsComponent {

  //this is the inputs values
  @Input() products: Product[] = [];
  @Input() sellProducts: SellProducts[] = [];
  @Input() customers: Customer[] = [];
  @Input() vehicles: Vehicles[] = [];
  @Input() paymentMedium: PaymentMedium[] = [];
  @Input() discounts: Discounts[] = []
  @Input() employeesList: Employees[] = []
  @Input() listFilter: Product[] = [];

  ///this is the components states
  modalState:boolean=false
  messagges: string = "";
  statusCode: number = 0;
  statusDeatil: 'Loading' | 'Success' | 'Error' | 'Init' = 'Init';

  //this is for create the bill number with the date
  numberBill: string = '';
  date: Date = new Date();
  day: string | number = this.date.getDate() < 10 ? `0${this.date.getDate()}` : this.date.getDate();
  month: string | number = (this.date.getMonth() + 1) < 10 ? `0${this.date.getMonth() + 1}` : this.date.getMonth() + 1;
  hour: string | number = this.date.getHours() < 10 ? `0${this.date.getHours()}` : this.date.getHours();

  //this is import the pipe filter
  filterpipe = new FilterPipe()
  itemFind: string = "";
  stateLenghtList: boolean = true;

  sell: CreateBillDTO = {
    customer: 0,
    vehicle: 0,
    employee: 0,
    payment_medium: 0,
    products_sell: [],
    subtotal: 0,
    tax: 0.19,
    tax_surcharge: 0,
    total_value: 0,
  }

  productsList: Product[] = []
  product: Product = {
    id: 0,
    category_id: {
      id: 0,
      category: ''
    },
    code: '',
    description: '',
    unit_value: 0,
    totals_stock: 0,
    percentage:0
  }

  sellProductsListId: number[] = [];
  sellProductDTOList: CreateSellProductsDTO[] = [];
  sellProductList: SellProducts[] = [];
  sellProductDTO: CreateSellProductsDTO = {
    product_id: 0,
    sell_date: new Date(),
    sell_bill: '',
    sell_stock: 0,
    total_sell_value: 0,
    discount_id:0,
    discount_value:0
  }

  sellProduct: SellProducts = {
    id: 0,
    product_id: this.product,
    sell_date: new Date(),
    sell_bill: '',
    sell_stock: 0,
    total_sell_value: 0,
    discount_id:{
      id: 0,
      types: '',
      description: '',
      percentage: 0,
    },
    discount_value:0
  }

  discount:Discounts={
    id:0,
    types: 'string',
    description: 'string',
    percentage: 0,
  }

  formBill!: FormGroup;
  get inputCustomer() {
    return this.formBill.get('customer');
  }
  get inputVehicle() {
    return this.formBill.get('vehicle');
  }
  get inputEmployee() {
    return this.formBill.get('employee');
  }
  get inputPaymentMedium() {
    return this.formBill.get('payment_medium');
  }
  private formAddBill() {
    this.formBill = this.formBuilder.group({
      customer: ['', [Validators.required]],
      vehicle: ['', [Validators.required]],
      employee: ['', [Validators.required]],
      payment_medium: ['', [Validators.required]],
    });
  }


  formSellProduct!: FormGroup;
  get cuantity() {
    return this.formSellProduct.get('cuantity');
  }
  get inputDate() {
    return this.formSellProduct.get('date');
  }
  get inputDiscounts() {
    return this.formSellProduct.get('discount');
  }
  private formAddSellProduct() {
    this.formSellProduct = this.formBuilder.group({
      cuantity: [, [Validators.required]],
      date: [new Date(), [Validators.required]],
      discount: ['', [Validators.required]],
    })
  }

  valueFind = new FormControl('');
  choiceProduct = new FormControl();

  constructor(
    private formBuilder: FormBuilder,
    private sellProductsService: SellProductsService,
    private productService: ProductService,
    private vehicleService: VehicleService,
    private billService: BillService,
  ) {
    this.formAddBill();
    this.formAddSellProduct();
  }

  //this is for get all sell products
  getAllSellProducts() {
    this.sellProductsService.getAllSellProducts().subscribe(
      data => {
        this.sellProducts = data;
      }
    )
  }

  //this is for get all products
  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      data => {
        this.products = data;
      }
    )
  }

  //this is the get all vehicles
  getAllVehicles() {
    this.vehicleService.getAllVehicles()
      .subscribe(data => {
        this.vehicles = data;
      })
  }

  //this is for change modal state
  toggleModal(){
    this.modalState =! this.modalState;
  }

  //this is the function for recive state modal the payments medium
  reciveToggleModal(event:boolean){
    this.modalState = event;
  }

  //this function to add bill and sell's products in data base
  submit(event: Event) {
    event.preventDefault();
    this.statusDeatil = 'Loading';

    const addSellProducts: CreateBillDTO = {
      employee: this.inputEmployee?.value,
      customer: this.inputCustomer?.value,
      vehicle: this.inputVehicle?.value,
      payment_medium: this.inputPaymentMedium?.value,
      products_sell: this.sellProductsListId,
      subtotal: this.sell.total_value - (this.sell.total_value * this.sell.tax),
      tax: this.sell.tax,
      tax_surcharge: this.sell.tax_surcharge,
      total_value: this.sell.total_value
    }

    if (this.formBill.valid && this.sellProductDTOList.length > 0) {
      this.sellProductDTOList.map(item => {
        zip(
          this.productService.getProduct(item.product_id),
          this.sellProductsService.createSellProducts(item),
        )
        .pipe(
          switchMap((item)=>{
            this.sellProductsListId.push(item[1].id)
            return this.productService.updateTotalStockProduct(item[0].id, {
              totals_stock: item[0].totals_stock - item[1].sell_stock,
            });
          }
          )
        )
        .subscribe(data => {
          this.getAllProducts();
        },(error) => {
          this.statusDeatil = 'Success';
          this.formBill.markAllAsTouched();
        })
      })

      this.billService.createBill(addSellProducts)
        .subscribe(data => {
          this.formBill.setValue({
            customer: '',
            vehicle: '',
            employee: '',
            payment_medium: '',
          });
        }, (error) => {
          this.statusDeatil = 'Error';
          this.formBill.markAllAsTouched();
      });

      Swal.fire({
        icon: 'success',
        confirmButtonText: 'regresar',
        title: 'La venta fue registrada con éxito',
        html: `La factura: <strong>${this.numberBill}</strong> fue registrada con éxito el ${this.day}-${this.month}-${this.date.getFullYear()} a las ${this.date.toLocaleTimeString()}`,
      })
      this.sellProductList = [];
      this.productsList = [];
      this.sellProductDTOList = [];
      this.sellProductList = [];
      this.sell.total_value = 0;
      this.statusDeatil = 'Success';

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
            <strong>3.</strong> Ingrese la cantidad de venta<br>
            <strong>4.</strong> Presione el botón de agregar.<br>
            <strong>5.</strong> Repita esta acción las veces que sea necesario<br>`,
      })
      this.statusDeatil = 'Error';
      this.formBill.markAllAsTouched();
    }
  }

  //this function is for delete any element in the sell product list
  toggleDelete(item: SellProducts) {
    const index = this.sellProductList.map(product => product).indexOf(item);
    const indexProduct = this.productsList.map(product => product).indexOf(item.product_id);
    if (index != -1) {
      this.sellProductList.splice(index, 1);
      this.sellProductDTOList.splice(index, 1);
      this.productsList.splice(indexProduct, 1);
      this.sell.total_value = this.sellProductDTOList.reduce((sum, item) => sum + item.total_sell_value, 0);

      Swal.fire({
        icon: 'success',
        confirmButtonText: 'regresar',
        title: 'Producto eliminado de; carrito con éxito',
        html: `<strong>Eliminados:</strong> ${item.product_id.description} x${item.sell_stock}`,
      })
    }
  }

  //this is the function for add sell products in the list, in this case, I take the item and  I fill the object transfer data and object for views in this component
  onClickAddProductList(item: Product) {

    let date: Date = new Date();
    this.numberBill = `FV${date.getFullYear()}${this.month}${this.day}${this.hour}`

    const index = this.productsList.map(product => product).indexOf(item)
    if (index == -1) {
      let discount = this.discounts.find(item => item.id == this.inputDiscounts?.value)
      if (discount) {
        this.sellProduct.discount_id = discount;
      }else{
        this.sellProduct.discount_id={
          id: 0,
          types: '',
          description: '',
          percentage: 0,
        }
      }

      this.sellProductDTO = {
        product_id: this.product.id,
        sell_date: this.inputDate?.value,
        sell_bill: this.numberBill,
        sell_stock: this.cuantity?.value,
        discount_id: this.sellProduct.discount_id.id>0?this.sellProduct.discount_id.id:null,
        discount_value: this.sellProduct.discount_id.percentage,
        total_sell_value: (this.product.unit_value * this.cuantity?.value)- ((this.product.unit_value * this.cuantity?.value)*this.sellProduct.discount_id.percentage)
      };

      this.sellProduct = {
        id: 0,
        product_id: this.product,
        sell_date: this.inputDate?.value,
        sell_bill: this.numberBill,
        sell_stock: this.cuantity?.value,
        discount_id: this.sellProduct.discount_id,
        discount_value: this.sellProduct.discount_id.percentage,
        total_sell_value: (this.product.unit_value * this.cuantity?.value)- ((this.product.unit_value * this.cuantity?.value)*this.sellProduct.discount_id.percentage),
      };
      this.productsList.push(item);
      this.sellProductDTOList.push(this.sellProductDTO);
      this.sellProductList.push(this.sellProduct);
    }

    this.sell.total_value = this.sellProductDTOList.reduce((sum, item) => sum + item.total_sell_value, 0);
    this.choiceProduct.reset();
    this.formSellProduct.setValue({
      cuantity: '',
      date: new Date(),
      discount:'',
    })

    this.product = {
      id: 0,
      category_id: {
        id: 0,
        category: ''
      },
      code: '',
      description: '',
      unit_value: 0,
      totals_stock: 0,
      percentage:0,
    }
  }

  //this is the funcion for add product's id in the list
  onClickListProducts(item: Product) {
    let index = this.productsList.map(product => product).indexOf(item);
    if (index != -1) {
      Swal.fire({
        icon: 'error',
        confirmButtonText: 'Regresar',
        title: '¡Fíjate en los productos!',
        text: 'Ya habías agregado este producto, cierra esta ventana y búscalo en la lista de productos agregados',
      })
      this.choiceProduct.reset();
    } else {
      this.product = item
      this.inputDate?.setValue(`${this.date.getFullYear()}-${this.month}-${this.day}`);
      this.inputDiscounts?.setValue(0);
      this.cuantity?.setValue('');
    }
  }

  //This is the function for filter customers in vehicle's select
  onChangeInputCustomer() {
    this.getAllVehicles();
    this.vehicles = this.vehicles.filter(
      item => item.owner.id == this.inputCustomer?.value)
    if (this.vehicles.length == 0) {
      this.stateLenghtList = false;
    } else {
      this.stateLenghtList = true;
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

  //This funcion is for to avoid taht to add products with total stock under cero
  onChangeInputCuantity(){
    let totalSell=this.product.totals_stock-this.cuantity?.value
    if(totalSell<=0){
      this.formSellProduct.reset();
      this.choiceProduct.reset();
      this.product = {
        id: 0,
        category_id: {
          id: 0,
          category: ''
        },
        code: '',
        description: '',
        unit_value: 0,
        totals_stock: 0,
        percentage:0
      }
      Swal.fire({
        icon: 'error',
        confirmButtonText: 'Regresar',
        title: '¡No puedes agregar esa cantidad!',
        html: `• Puede que no hayas ingresado algunos productos que llegaron, <strong>ingrésalos</strong>.
        <br><br>
        • En caso de que no hayas olvidado nada, verifica la cantidad en la lista.`,
      })
    }
  }
}
