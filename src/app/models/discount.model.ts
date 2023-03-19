export interface Discounts{
  id: 1,
  types: string;
  description: string;
  percentage: number;
}

export interface CreateDiscountDTO extends Omit<Discounts, 'id'>{
}
