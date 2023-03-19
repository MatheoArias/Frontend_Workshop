export interface PaymentMedium{
  id:number;
  medium:string;
}

export interface CreatePaymentMediumDTO extends Omit<PaymentMedium,'id'>{
}

