import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  messagges='';
  statusCode=0;
  statusDeatil:'Loading' | 'Success' | 'Error'| 'Init' = 'Init';

  formLogin!:FormGroup;
  get emailAdress(){
    return  this.formLogin.get('emailAdress');
  }
  get password(){
    return this.formLogin.get('password');
  }
  private formUsersLogin(){
    this.formLogin=this.formBuilder.group({
      emailAdress: ['', [Validators.required,Validators.email]],
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


  getStatusDetail(){
    this.statusDeatil='Loading'
  }

  changePassword=false;
  inputType='password'

  onChangePassword(){
    this.changePassword=!this.changePassword;
    this.inputType=this.changePassword==true?'text':'password'
  }

  //this function is for send the username and password. if the information is correct, take teh token and save in localStorage.
  submit(event:Event){
    this.statusDeatil='Loading';
    event.preventDefault();
    const user= this.formLogin.value;
    if(this.formLogin.valid){
      this.authService.login(user.emailAdress,user.password)
      .subscribe(
        data=>{
          this.tokenService.saveUser(data);
          this.router.navigate(['/products/add_product']);
          this.statusDeatil='Loading';
        },()=>{
          this.statusDeatil='Error';
          this.messagges='El correo electrónico o la contraseña no son correctas. Vuelve a intentarlo'
          this.formLogin.markAllAsTouched();
        }
      )
    }else{
      this.statusDeatil='Error';
      this.messagges='El correo electrónico o la contraseña no son válidos'
      this.formLogin.markAllAsTouched();
    }
  }
}
