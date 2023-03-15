import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Auth } from 'src/app/models/auth.models';
import { Users } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin!:FormGroup;

  private formUsersLogin(){
    this.formLogin=this.formBuilder.group({
      emailAdress: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  constructor(
    private authService:AuthService,
    private tokenService:TokenService,
    private router:Router,
    private formBuilder: FormBuilder
  ){
    this.formUsersLogin()
  }

  submit(event:Event){
    event.preventDefault();
    const user= this.formLogin.value;
    this.authService.login(user.emailAdress,user.password).subscribe(
      data=>{
        this.tokenService.saveUser(data);
      }
    )
    this.router.navigate(['/home']);
  }
}
