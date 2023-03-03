import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuysProductsComponent } from './components/buys-products/buys-products.component';
import { ProductComponent } from './components/product/product.component';
import { BillsComponent } from './pages/bills/bills.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { Notfound404Component } from './pages/notfound404/notfound404.component';
import { ProductsComponent } from './pages/products/products.component';
import { SellsComponent } from './pages/sells/sells.component';
import { UsersComponent } from './pages/users/users.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/home',
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
        component:BuysProductsComponent
      },
      {
        path:'product',
        component:ProductComponent
      },
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
    path:'login',
    component:LoginComponent
  },
  {
    path:'sells',
    component:SellsComponent
  },
  {
    path:'vehicle',
    component:VehiclesComponent
  },
  {
    path:'users',
    component:UsersComponent
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
