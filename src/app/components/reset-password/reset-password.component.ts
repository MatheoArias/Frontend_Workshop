import { Component } from '@angular/core';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent {

  statusDeatil:'Loading' | 'Success' | 'Error'| 'Init' = 'Init';

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private resetPasswordService:ResetPasswordService
  ){
    this.formAddEmailReset();
  }

  get email(){
    return this.formEmailReset.get('email');
  }
  formEmailReset!: FormGroup;
  private formAddEmailReset() {
    this.formEmailReset = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
    });
  }

  submit(event:Event){
    this.statusDeatil='Loading'
    event.preventDefault();
    const email=this.formEmailReset.value
    if(this.formEmailReset.valid){
      this.resetPasswordService.resetPassword(email)
        .subscribe(()=>{
          this.router.navigate(['/login']);
        },()=>{
          Swal.fire({
            icon: 'error',
            confirmButtonText: 'Regresar',
            title: 'Error',
            html: `ha Ocurrido un error en el envío del formulario`,
          })
        })
      this.statusDeatil='Success'
    }else{
      Swal.fire({
        icon: 'error',
        confirmButtonText: 'Regresar',
        title: 'Error',
        html: `ha ocurrido un error en el envío del formulario`,
      })
      this.statusDeatil='Error'
    }
  }
}
