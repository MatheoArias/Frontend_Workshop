import { Component,OnInit } from '@angular/core';
import { Product, } from 'src/app/models/product.model';
import { SellProducts } from 'src/app/models/sell_product.model';
import { Vehicles } from 'src/app/models/vehicle.models';
import { Customer } from 'src/app/models/customer.model';
import { PaymentMedium } from 'src/app/models/payment_medium.models';
import { Discounts } from 'src/app/models/discount.model';

import { CustomerService } from 'src/app/services/customer.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ProductService } from 'src/app/services/product.service';
import { SellProductsService } from 'src/app/services/sell-products.service';
import { PaymentMediumService } from 'src/app/services/payment-medium.service';
import { DiscountService } from 'src/app/services/discount.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employees } from 'src/app/models/employee.model';


@Component({
  selector: 'app-sells',
  templateUrl: './sells.component.html',
  styleUrls: ['./sells.component.scss']
})

export class SellsComponent implements OnInit {

  products:Product[] = [];
  sellProducts:SellProducts[]=[];
  customers:Customer[] = [];
  vehicles:Vehicles[] = [];
  paymentMedium:PaymentMedium[] = [];
  discount:Discounts[] = [];
  employeesList:Employees[] = [];
  listFilter:Product[]=[];

  constructor(
    private productService: ProductService,
    private sellProductsService: SellProductsService,
    private customerService:CustomerService,
    private vehicleService: VehicleService,
    private paymentMediumService:PaymentMediumService,
    private discountService:DiscountService,
    private employeeService:EmployeeService
  ){

  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllSellProducts();
    this.getAllCustomers();
    this.getAllVehicles();
    this.getAllPaymentMedium();
    this.getAllDiscounts();
    this.getAllEmployees();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(
      data=>{
        this.products = data;
        this.listFilter=data;
      }
    )
  }

  getAllSellProducts(){
    this.sellProductsService.getAllSellProducts()
    .subscribe(
      data=>{
        this.sellProducts = data;
      }
    )
  }

  getAllCustomers(){
    this.customerService.getAllCustomer()
    .subscribe(
      data=>{
        this.customers = data;
      }
    )
  }

  getAllVehicles(){
    this.vehicleService.getAllVehicles()
    .subscribe(
      data=>{
        this.vehicles = data;
      }
    )
  }

  getAllPaymentMedium(){
    this.paymentMediumService.getAllPaymentsMedium()
    .subscribe(data=>{
      this.paymentMedium=data;
    })
  }

  getAllDiscounts(){
    this.discountService.getAllDiscounts()
    .subscribe(data=>{
      this.discount=data;
    })
  }

  getAllEmployees(){
    this.employeeService.getAllEmployees()
    .subscribe(data=>{
      this.employeesList=data;
    })
  }
}
