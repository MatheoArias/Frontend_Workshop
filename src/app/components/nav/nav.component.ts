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

  navState=false;
  logoutListState=false;


  token=''
  user:UserNav={
    names:'',
    position:'',
  }
  superUser= false;


  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getUser();
  }

  reciveToggleModal(event:boolean){
    this.navState=event
  }

  //This function is called for to get user and return name and position user
  getUser(){
    const getUser: null | string =this.tokenService.getUser();
    if(getUser){
      const usernameToken=JSON.parse(getUser).user;
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

  //This function is called when i want open navbar in small screens
  toggleShowNav(){
    this.navState=!this.navState;
  }

  //This function is called when i want logout administrator
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

  OnOpenListLogout(){
    this.logoutListState=!this.logoutListState
  }
}
