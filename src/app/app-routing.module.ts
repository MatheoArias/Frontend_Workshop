import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuysProductsComponent } from './components/buys-products/buys-products.component';
import { MovementsComponent } from './components/movements/movements.component';
import { ProductComponent } from './components/product/product.component';
import { SellProductsComponent } from './components/sell-products/sell-products.component';
import { BillsComponent } from './pages/bills/bills.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { HomeComponent } from './pages/home/home.component';
import { Notfound404Component } from './pages/notfound404/notfound404.component';
import { ProductsComponent } from './pages/products/products.component';
import { SellsComponent } from './pages/sells/sells.component';
import { UsersComponent } from './pages/users/users.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './guards/auth.guard';
import { EmployeesComponent } from './pages/employees/employees.component';



const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'',
        redirectTo: '/login',
        pathMatch:"full"
      },

      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'products',
        component:ProductsComponent,
        children:[
          {
            path:'buys_product',
            component:BuysProductsComponent,
            canActivate:[AuthGuard]
          },
          {
            path:'add_product',
            component:ProductComponent,
            canActivate:[AuthGuard]
          },
          {
            path:'movements',
            component:MovementsComponent,
            canActivate:[AuthGuard]
          }
        ]
      },
      {
        path:'bill',
        component:BillsComponent
      },
      {
        path:'customer',
        component:CustomersComponent
      },

      {
        path:'sells',
        component:SellProductsComponent,
      },
      {
        path:'users',
        component:UsersComponent
      },
      {
        path:'employees',
        component:EmployeesComponent
      },
    ]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'**',
    component:Notfound404Component
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
