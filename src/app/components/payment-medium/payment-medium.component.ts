import { Component, Input,Output,EventEmitter } from '@angular/core';
import { PaymentMedium } from 'src/app/models/payment_medium.models';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PaymentMediumService } from 'src/app/services/payment-medium.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-medium',
  templateUrl: './payment-medium.component.html',
  styleUrls: ['./payment-medium.component.scss']
})
export class PaymentMediumComponent {

  statusCode: number=0;
  statusDeatil:'Loading' | 'Success' | 'Error'| 'Init' = 'Init'

  @Output() modalStateEvent= new EventEmitter<boolean>();
  modalState:boolean=true;

  @Input() paymentMediums: PaymentMedium[] = []
  paymentMedium:PaymentMedium={
    id:0,
    medium:''
  }

  formPaymentMedium!:FormGroup;
  get medium() {
    return this.formPaymentMedium.get('medium');
  }
  private formAddPaymentMedium() {
  this.formPaymentMedium = this.formBuilder.group({
      medium: ['', [Validators.required]]
    });
  }

  constructor(
    private formBuilder:FormBuilder,
    private paymentMediumService: PaymentMediumService
  ) {
    this.formAddPaymentMedium();
  }

  //this function call all payments medium
  getAllPaymentMedium(){
    this.paymentMediumService.getAllPaymentsMedium()
    .subscribe(data=>{
      this.paymentMediums=data;
    })
  }

  //this funtion choice payment medium with click in input type radio
  toggleUpdate(item:PaymentMedium){
    this.paymentMediumService.getPaymentMedium(item.id)
    .subscribe(data=>{
      this.formPaymentMedium.patchValue(data)
      this.paymentMedium=data
    },(error)=>{
        this.statusDeatil='Error';
        this.formPaymentMedium.markAllAsTouched();
      }
    )
  }

  //this funtion delete payment medium with click in the button
  toggleDelete(item:PaymentMedium){
    if(item.id){
      this.statusDeatil='Loading'
      this.paymentMediumService.deletePaymentMedium(item.id)
      .subscribe(data=>{
        this.getAllPaymentMedium();
        Swal.fire({
          icon: 'success',
          confirmButtonText: 'Regresar',
          title: 'Medio de pago eliminado con éxito',
        })
      },(error)=>{
        Swal.fire({
          icon: 'error',
          confirmButtonText: 'Regresar',
          title: 'El medio de pago que desea eliminar no existe',
        })
      })
      this.statusDeatil='Success'
    }else{
      this.statusDeatil='Error'
      Swal.fire({
        icon: 'error',
        confirmButtonText: 'Regresar',
        title: 'El medio de pago que desea eliminar no existe',
      })
    }
  }

  //this funtion update payment medium with click in the form's button
  updatePaymentMedium(event:Event){
    event.preventDefault();
    this.statusDeatil='Loading';
    const paymentMedium=this.formPaymentMedium.value;
    if (this.formPaymentMedium.valid) {
      this.paymentMediumService.updatePaymentMedium(this.paymentMedium.id,paymentMedium)
      .subscribe(
        data=>{
          this.getAllPaymentMedium();
          Swal.fire({
            icon: 'success',
            confirmButtonText: 'Regresar',
            title: 'Medio de pago modificado con éxito',
            text:`El medio de pago ${data.medium} fue modificado con éxito`
          })
        }
      )
      this.statusDeatil='Success';
      this.formPaymentMedium.reset();
      this.paymentMedium={
        id:0,
        medium:''
      }
    } else {
      Swal.fire({
        icon: 'error',
        confirmButtonText: 'Regresar',
        title: 'Ocurrió un error',
      })
      this.statusDeatil='Error';
      this.formPaymentMedium.markAllAsTouched();
    }
  }

  //this funtion create payment medium with click in the form's button
  submit(event:Event){
    event.preventDefault();
    this.statusDeatil='Loading';
    const paymentMedium=this.formPaymentMedium.value;
    if(this.formPaymentMedium.valid){
      this.paymentMediumService.createPaymentMedium(paymentMedium)
      .subscribe(data=>{
        this.getAllPaymentMedium();
      });
      Swal.fire({
        icon: 'success',
        confirmButtonText: 'Regresar',
        title: 'Medio de pago agregado con éxito',
      })
      this.statusDeatil='Success';
      this.formPaymentMedium.reset();
    }else{
      this.statusDeatil='Error';
      this.formPaymentMedium.markAllAsTouched();
    }
  }

  //this function send the modal's state
  sendModalState(){
    this.modalState =false;
    this.modalStateEvent.emit(this.modalState);
    this.getAllPaymentMedium();
  }

}
