import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxChartsModule} from '@swimlane/ngx-charts'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CategoryComponent } from './components/category/category.component';
import { BuysProductsComponent } from './components/buys-products/buys-products.component';
import { SellProductsComponent } from './components/sell-products/sell-products.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { BillsComponent } from './pages/bills/bills.component';
import { SellsComponent } from './pages/sells/sells.component';
import { Notfound404Component } from './pages/notfound404/notfound404.component';
import { NavComponent } from './components/nav/nav.component';
import { UsersComponent } from './pages/users/users.component';
import { MovementsComponent } from './components/movements/movements.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { CustomerComponent } from './components/customer/customer.component';
import { DocumentTypeComponent } from './components/document-type/document-type.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeesComponent } from './pages/employees/employees.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CategoryComponent,
    BuysProductsComponent,
    SellProductsComponent,
    HomeComponent,
    ProductsComponent,
    VehiclesComponent,
    CustomersComponent,
    BillsComponent,
    SellsComponent,
    Notfound404Component,
    NavComponent,
    UsersComponent,
    MovementsComponent,
    LayoutComponent,
    LoginComponent,
    CustomerComponent,
    DocumentTypeComponent,
    EmployeeComponent,
    EmployeesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    NgxChartsModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
