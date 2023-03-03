import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillsComponent } from './pages/bills/bills.component';
import { BuysproductspageComponent } from './pages/buysproductspage/buysproductspage.component';
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
    component:ProductsComponent
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
    path:'buys_products',
    component:BuysproductspageComponent
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
