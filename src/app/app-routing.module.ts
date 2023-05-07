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
import { EmployeeComponent } from './components/employee/employee.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { UpdateBuyProductComponent } from './components/update-buy-product/update-buy-product.component';
import { UpdateSellProductComponent } from './components/update-sell-product/update-sell-product.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetConfirmPasswordComponent } from './components/reset-confirm-password/reset-confirm-password.component';



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
        path:'sells',
        component:SellsComponent,
        children:[
          {
            path:'sell_product',
            component:SellProductsComponent,
            canActivate:[AuthGuard]
          },
          {
            path:'update_sell_product',
            component:UpdateSellProductComponent,
            canActivate:[AuthGuard]
          }
        ]
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
          },
          {
            path:'update_buy_products',
            component:UpdateBuyProductComponent,
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
        path:'vehicles',
        component:VehiclesComponent,
        children:[
          {
            path:'add_vehicle',
            component:VehicleComponent,
          }
        ]
      },
      {
        path:'users',
        component:UsersComponent,
        children:[
          {
            path:'register',
            component:RegisterUserComponent,
          },
        ]
      },
      {
        path:'employees',
        component:EmployeesComponent,
        children:[
          {
            path:'add_employees',
            component:EmployeeComponent,
            canActivate:[AuthGuard]
          }
        ]
      },
    ]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterUserComponent,
  },
  {
    path:'password_reset',
    component:ResetPasswordComponent,
  },
  {
    path:'password_confirm_reset',
    component:ResetConfirmPasswordComponent,
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
