import { Component } from '@angular/core';
import { Users } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { CreateUsersDto } from 'src/app/models/users.model';
import Swal from 'sweetalert2';
import { MyValidators } from 'src/app/validators/my-validators';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {

  user:Users={
    id: 0,
    last_login: new Date(),
    email: '',
    name: '',
    last_name: '',
    is_active: true,
    is_staff: true,
    is_superuse: true,
    groups: [],
    user_permissions: []
  }

  changePassword=false;
  passwordEqual=false;
  inputType='password'

  constructor(
    private formBuilder: FormBuilder,
    private usersService:UsersService,
  ){
    this.formAddUsers();
  }

  statusDeatil:'Loading' | 'Success' | 'Error'| 'Init' = 'Init';
  formUser!: FormGroup;
  get name() {
    return this.formUser.get('name');
  }
  get lastName() {
    return this.formUser.get('last_name');
  }
  get email() {
    return this.formUser.get('email');
  }
  get password() {
    return this.formUser.get('password');
  }
  get passwordConfirm() {
    return this.formUser.get('password_confirm');
  }
  private formAddUsers() {
    this.formUser = this.formBuilder.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password: ['',[
          Validators.required,
          MyValidators.validPasswordNumber,
          MyValidators.validPassworExpression,
          Validators.minLength(8),
        ]],
      password_confirm:['', [Validators.required]],
    },{
      validators:MyValidators.matchPassword
    });
  }

  onChangePassword(){
    this.changePassword=!this.changePassword;
    this.inputType=this.changePassword==true?'text':'password'
  }

  submit(event:Event){
    event.preventDefault()
    this.statusDeatil='Loading'
    const addUser:CreateUsersDto={
      last_login: new Date(),
      email: this.email?.value,
      name: this.name?.value,
      password:this.password?.value,
      last_name: this.lastName?.value,
      is_active: true,
      is_staff: true,
      is_superuse: true,
      groups: [],
      user_permissions: []
    }
    if(this.formUser.valid){
      this.usersService.createUser(addUser).
        subscribe(()=>{
          Swal.fire({
            icon: 'success',
            confirmButtonText: 'Regresar',
            title: 'Error',
            html: `El administrador: ${this.name?.value} fue agregado con éxito ` ,
          })
          this.statusDeatil='Success'
        },()=>{
          Swal.fire({
            icon: 'error',
            confirmButtonText: 'Regresar',
            title: 'Error',
            html: `Ocurrió un error en el momento de enviar el formulario`,
          })
          this.statusDeatil='Error'
        });
      this.formUser.reset()
    }else{
      Swal.fire({
        icon: 'error',
        confirmButtonText: 'Regresar',
        title: 'Error',
        html: `Ocurrió un error al enviar el formulario, revise cada uno de los campos y vuelva a intentarlo`,
      })
      this.formUser.markAllAsTouched();
    }
  }
}
