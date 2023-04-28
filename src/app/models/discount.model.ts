export interface Discounts{
  id: number;
  types: string;
  description: string;
  percentage: number;
}

export type CreateDiscountDTO = Omit<Discounts, 'id'>
