import { Component } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { MyValidators } from 'src/app/validators/my-validators';

@Component({
  selector: 'app-reset-confirm-password',
  templateUrl: './reset-confirm-password.component.html',
  styleUrls: ['./reset-confirm-password.component.scss']
})

export class ResetConfirmPasswordComponent {

  changePassword=false;
  passwordEqual=false;
  inputType='password'

  formPasswordReset!: FormGroup;

  statusDeatil:'Loading' | 'Success' | 'Error'| 'Init' = 'Init'
  get password() {
    return this.formPasswordReset.get('password');
  }
  get passwordConfirm() {
    return this.formPasswordReset.get('password_confirm');
  }
  private formAddPasswordReset() {
    this.formPasswordReset = this.formBuilder.group({
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

  constructor(
    private formBuilder: FormBuilder,
  ){
    this.formAddPasswordReset();
  }

  onChangePassword(){
    this.changePassword=!this.changePassword;
    this.inputType=this.changePassword==true?'text':'password'
  }

}
