export interface PaymentMedium{
  id:number;
  medium:string;
}

export type CreatePaymentMediumDTO = Omit<PaymentMedium,'id'>

