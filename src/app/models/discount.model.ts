export interface Discounts{
  id: number,
  types: string;
  description: string;
  percentage: number;
}

export interface CreateDiscountDTO extends Omit<Discounts, 'id'>{
}
