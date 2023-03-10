import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/app/models/users.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(
    private usersService: UsersService,
    private authService:AuthService
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

  LoginUser(){
    this.authService.login('MatheoArias','Mateocorrea1').subscribe(
      data=>{
        this.token=data.token;
        this.user=data.user;
      }
    )
  }

}
