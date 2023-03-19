import { Component,Input } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

import { SellProducts,UpdateSellProductsDTO,CreateSellProductsDTO } from 'src/app/models/sell_product.model';
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

  stateLenghtList :boolean = true;

  sellProductsList:number[] = [];
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

  formSellProduct!:FormGroup;
  messagges:string="";
  selectedSelldProductId:number=0;


  get inputCustomer() {
    return this.formSellProduct.get('customer');
  }
  get inputVehicle() {
    return this.formSellProduct.get('vehicle');
  }
  get inputEmployee() {
    return this.formSellProduct.get('employee');
  }
  get inputPaymentMedium(){
    return this.formSellProduct.get('payment_medium');
  }
  get inputDiscounts() {
    return this.formSellProduct.get('discounts');
  }

  private formAddSellProduct() {
    this.formSellProduct = this.formBuilder.group({
      customer: ['', [Validators.required]],
      vehicle: ['', [Validators.required]],
      employee: ['', [Validators.required]],
      payment_medium: ['', [Validators.required]],
      discounts: ['', [Validators.required]],
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private sellProductsService:SellProductsService,
    private productService:ProductService,
    private vehicleService:VehicleService
  ){
    this.formAddSellProduct()
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
    const addSellPorducts:CreateSellDTO={
      bill_number:'string',
      customer:this.inputCustomer?.value,
      vehicle:this.inputVehicle?.value,
      employee:this.inputEmployee?.value,
      payment_medium:this.inputPaymentMedium?.value,
      products_sell:this.sellProductsList,
      discounts:this.inputDiscounts?.value,
      discount_value:0,
      subtotal:0,
      tax: 0.19,
      tax_surcharge:0,
      total_value:0,
    }
    console.log(addSellPorducts)
  }

  onClickListProducts(item: Product){
    const index=this.sellProductsList.map(product=>product).indexOf(item.id)
    if(index==-1){
      this.sellProductsList.push(item.id)
      console.log(this.sellProductsList)
    }else{
      this.sellProductsList.splice(index, 1);
      console.log(this.sellProductsList)
    }
  }

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
}
