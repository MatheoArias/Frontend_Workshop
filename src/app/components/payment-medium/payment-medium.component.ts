import { Component, Input } from '@angular/core';
import { PaymentMedium } from 'src/app/models/payment_medium.models';
import { PaymentMediumService } from 'src/app/services/payment-medium.service';

@Component({
  selector: 'app-payment-medium',
  templateUrl: './payment-medium.component.html',
  styleUrls: ['./payment-medium.component.scss']
})

export class PaymentMediumComponent {

  @Input() paymentMedium: PaymentMedium[] = []
  paymentMediumId:number=0;

  constructor(
    private paymentMediumService: PaymentMediumService
  ) {}

  getAllPaymentMedium(){
    this.paymentMediumService.getAllPaymentsMedium()
    .subscribe(data=>{
      this.paymentMedium=data;
    })
  }

  toggleUpdate(item:PaymentMedium){
    this.paymentMediumId=item.id
  }

  toggleDelete(item:PaymentMedium){
    this.paymentMediumService.deletePaymentMedium(item.id)
      .subscribe(data=>{
        this.getAllPaymentMedium();
      })
  }

  onCLose(){

  }

}
