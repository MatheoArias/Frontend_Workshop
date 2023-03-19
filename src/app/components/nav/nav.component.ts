import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { UserNav } from 'src/app/models/users.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  navState:boolean=false;
  listStateInventory=false;
  listStateSell:boolean=false
  listStateCustomers:boolean=false;
  listStateVehicles:boolean=false;
  listStateEmployees:boolean=false;

  token:string=''
  user:UserNav={
    names:'',
    position:'',
  }
  superUser:boolean = false;


  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    let getUser: null | string =this.tokenService.getUser();
    if(getUser){
      let usernameToken=JSON.parse(getUser).user;
      this.user={
        names:`${usernameToken.name} ${usernameToken.last_name}`,
        position:'Administrador'
      }
    }else{
      this.user={
        names:'No hay sesion iniciada',
        position:'',
      }
    }
  }

  toggleShowNav(){
    this.navState=!this.navState;
  }
  onActivateInventory(){
    this.listStateInventory=!this.listStateInventory;
    this.listStateSell=false
    this.listStateCustomers=false;
    this.listStateVehicles=false;
    this.listStateEmployees=false;
  }
  onActivateSell(){
    this.listStateSell=!this.listStateSell;
    this.listStateInventory=false
    this.listStateCustomers=false;
    this.listStateVehicles=false;
    this.listStateEmployees=false;
  }
  onActivateCustomer(){
    this.listStateCustomers=!this.listStateCustomers;
    this.listStateInventory=false
    this.listStateSell=false
    this.listStateVehicles=false;
    this.listStateEmployees=false;
  }
  onActivateVehicle(){
    this.listStateVehicles=!this.listStateVehicles;
    this.listStateInventory=false
    this.listStateSell=false
    this.listStateCustomers=false;
    this.listStateEmployees=false;
  }
  onActivateEmployee(){
    this.listStateEmployees=!this.listStateEmployees;
    this.listStateInventory=false
    this.listStateSell=false
    this.listStateCustomers=false;
    this.listStateVehicles=false;
  }

  OncCloseNav(){
    if(this.navState==true){
      this.navState=!this.navState;
    }
    this.listStateInventory=this.listStateInventory==true?this.listStateInventory!=this.listStateInventory:false;
    this.listStateSell=this.listStateSell==true?this.listStateSell=!this.listStateSell:false;
    this.listStateCustomers=this.listStateCustomers==true?this.listStateCustomers=!this.listStateCustomers:false;
    this.listStateVehicles=this.listStateVehicles==true?this.listStateVehicles=!this.listStateVehicles:false;
    this.listStateEmployees=this.listStateEmployees==true?this.listStateEmployees=!this.listStateEmployees:false;
  }

  LogoutUser(){
    const user=this.tokenService.getUser();
    if(user){
      const objUser=JSON.parse(user);
      this.authService.logout(objUser.user.id).subscribe();
      this.router.navigate(['/login']);
      localStorage.removeItem('token');
    }else{
      alert('Este usuario no ha iniciado sección')
    }
  }
}
