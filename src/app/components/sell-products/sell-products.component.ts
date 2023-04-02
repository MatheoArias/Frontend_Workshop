import { Component,Input } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl } from '@angular/forms';

import { SellProducts,UpdateSellProductsDTO,CreateSellProductsDTO } from 'src/app/models/sell_product.model';
import { Bill,CreateBillDTO,UpdateBillDTO } from 'src/app/models/bill.models';
import { Product} from 'src/app/models/product.model';
import { Customer } from 'src/app/models/customer.model';
import { Vehicles } from 'src/app/models/vehicle.models';
import { CreateSellDTO } from 'src/app/models/sell.model';
import { PaymentMedium } from 'src/app/models/payment_medium.models';
import { Discounts } from 'src/app/models/discount.model';

import { ProductService } from 'src/app/services/product.service';
import { SellProductsService } from 'src/app/services/sell-products.service';
import { Employees } from 'src/app/models/employee.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import { BillService } from 'src/app/services/bill.service';

import { FilterPipe } from 'src/app/pipes/filter.pipe';

@Component({
  selector: 'app-sell-products',
  templateUrl: './sell-products.component.html',
  styleUrls: ['./sell-products.component.scss']
})

export class SellProductsComponent  {

  @Input() products:Product[] = [];
  @Input() sellProducts:SellProducts[]=[];
  @Input() customers:Customer[] = [];
  @Input() vehicles:Vehicles[] = [];
  @Input() paymentMedium:PaymentMedium[]=[];
  @Input() discount:Discounts[]=[]
  @Input() employeesList:Employees[]=[]
  @Input() listFilter:Product[]=[];


  itemFind:string="";
  stateLenghtList :boolean = true;

  sellProductsListId:number[] = [];
  sellProductList:SellProducts[]=[];
  sellProductDTOList:CreateSellProductsDTO[]=[];
  sellProductId:number=0;

  messagges:string="";
  statusCode: number = 0;
  statusDeatil: 'Loading' | 'Success' | 'Error' | 'Init' = 'Init';
  filterpipe= new FilterPipe()
  numberBill:string='';

  date:Date = new Date();
  day:string | number =this.date.getDay()<10?`0${this.date.getDay()}`:this.date.getDay();
  month:string | number =(this.date.getMonth()+1)<10?`0${this.date.getMonth()+1}`:this.date.getMonth()+1;
  hour:string | number =this.date.getHours()<10?`0${this.date.getHours()}`:this.date.getHours();
  minutes:string | number =this.date.getMinutes()<10?`0${this.date.getMinutes()}`:this.date.getMinutes();

  sell:CreateSellDTO={
    bill_number:'string',
    customer:0,
    vehicle:0,
    employee:0,
    payment_medium:0,
    products_sell:[],
    discounts:0,
    discount_value:0,
    subtotal:0,
    tax: 0,
    tax_surcharge:0,
    total_value:0,
  }

  product:Product={
    id: 0,
    category_id:{
      id:0,
      category: ''
    },
    code: '',
    description: '',
    unit_value:0,
    totals_stock: 0,
  }

  sellProductDTO:CreateSellProductsDTO={
    product_id:0,
    sell_date:new Date(),
    sell_bill:'',
    sell_stock:0,
    total_sell_value:0,
  }

  sellProduct:SellProducts={
    id:0,
    product_id:this.product,
    sell_date:new Date(),
    sell_bill:'',
    sell_stock:0,
    total_sell_value:0,
  }



  formSellProduct!:FormGroup;

  get inputCustomer() {
    return this.formBill.get('customer');
  }
  get inputVehicle() {
    return this.formBill.get('vehicle');
  }
  get inputEmployee() {
    return this.formBill.get('employee');
  }
  get inputPaymentMedium(){
    return this.formBill.get('payment_medium');
  }
  get inputDiscounts() {
    return this.formBill.get('discounts');
  }

  private formAddBill() {
    this.formBill = this.formBuilder.group({
      customer: ['', [Validators.required]],
      vehicle: ['', [Validators.required]],
      employee: ['', [Validators.required]],
      payment_medium: ['', [Validators.required]],
      discounts: ['', [Validators.required]],
    });
  }

  formBill!:FormGroup;

  get cuantity(){
    return this.formSellProduct.get('cuantity');
  }
  get inputDate() {
    return this.formSellProduct.get('date');
  }

  private formAddSellProduct(){
    this.formSellProduct=this.formBuilder.group({
      cuantity:[,[Validators.required]],
      date:[new Date(),[Validators.required]]
    })
  }

  valueFind=new FormControl('');

  constructor(
    private formBuilder: FormBuilder,
    private sellProductsService:SellProductsService,
    private productService:ProductService,
    private vehicleService:VehicleService,
    private billService:BillService
  ){
    this.formAddBill();
    this.formAddSellProduct();
  }

  getAllSellProducts(){
    this.sellProductsService.getAllSellProducts().subscribe(
      data=>{
        this.sellProducts = data;
      }
    )
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(
      data=>{
        this.products = data;
      }
    )
  }

  getAllVehicles(){
    this.vehicleService.getAllVehicles()
    .subscribe(data=>{
      this.vehicles = data;
    })
  }

  submit(event:Event){
    event.preventDefault();
    const addSellProducts:CreateBillDTO={
      employee:this.inputEmployee?.value,
      discounts:this.inputDiscounts?.value,
      customer:this.inputCustomer?.value,
      vehicle:this.inputVehicle?.value,
      payment_medium:this.inputPaymentMedium?.value,
      products_sell:this.sellProductsListId,
      discount_value:0,
      subtotal:0,
      tax: 0.19,
      tax_surcharge:0,
      total_value:0,
    }
    this.formBill.reset();
  }

  toggleDelete(item: SellProducts){
    const index = this.sellProductList.map(product => product).indexOf(item);
    if (item.product_id.id) {
      this.sellProductList.splice(index, 1);
      this.sell.total_value=this.sell.total_value-item.total_sell_value;
    }
  }

  /*this is the funrion for add sell products in the list */
  onClickAddProductList(item:Product) {
    const index = this.sellProductsListId.map(product => product).indexOf(this.product.id)
    let date:Date = new Date();

    this.numberBill=`FV${date.getFullYear()}${this.month}${this.day}${this.hour}${this.minutes}`

    if (index == -1) {

      this.sellProductDTO = {
        product_id: this.product.id,
        sell_date: this.inputDate?.value,
        sell_bill: this.numberBill,
        sell_stock: this.cuantity?.value,
        total_sell_value: this.product.unit_value * this.cuantity?.value
      };
      this.sellProductDTOList.push(this.sellProductDTO )

      this.sellProduct = {
        id: 0,
        product_id: this.product,
        sell_date: this.inputDate?.value,
        sell_bill: this.numberBill,
        sell_stock: this.cuantity?.value,
        total_sell_value: this.cuantity?.value * this.product.unit_value,
      }
      this.sellProductList.push(this.sellProduct);
    }
    this.sell.total_value=this.sellProductDTOList.reduce((sum,item)=>sum+item.total_sell_value,0)
    this.formSellProduct.reset();

    this.product={
      id: 0,
      category_id:{
        id:0,
        category: ''
      },
      code: '',
      description: '',
      unit_value:0,
      totals_stock: 0,
    }
  }

  /*this is the funcion for add product's id in the list*/
  onClickListProducts(item: Product){
    this.product=item
    this.inputDate?.setValue(`${this.date.getFullYear()}-${this.month}-${this.day}`);
  }

  /*This is the function for filter customers in vehicle's select*/
  onChangeInputCustomer(){
    this.getAllVehicles();
    this.vehicles=this.vehicles.filter(
      item=>item.owner.id==this.inputCustomer?.value)
    if(this.vehicles.length==0){
      this.stateLenghtList=false;
    }else{
      this.stateLenghtList=true;
    }
  }

  //this is the function fot make the search in product's list
  onChangeText(){
    if(this.valueFind.value){
      this.itemFind=this.valueFind.value;
      this.listFilter=this.filterpipe.transform(this.products,this.itemFind);
    }else{
      this.itemFind="";
    }
  }

}
