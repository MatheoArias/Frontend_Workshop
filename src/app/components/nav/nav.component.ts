import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { Users } from 'src/app/models/users.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ){}

  navState=false;
  listState=false;
  token:string=''
  user:Users={
    id: 0,
    last_login: new Date(),
    username:'',
    email:'',
    name: '',
    last_name:'',
    is_active: true,
    is_staff: true,
    is_superuse: true,
    groups:[],
    user_permissions: [],
  }

  toggleShowNav(){
    this.navState=!this.navState;
  }

  toggleActivateList(){
    this.listState=!this.listState;
  }

  toggleChooseList(){
    if(this.navState==false){
      this.listState=!this.listState;
    }else{
      this.listState=!this.listState;
      this.navState=!this.navState;
    }
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
