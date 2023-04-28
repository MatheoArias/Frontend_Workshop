export interface Category{
  id:number;
  category: string;
}

export type CreateCategoryDTO = Omit <Category,'id'>

export interface UpdateaCategoryDTO extends Partial<CreateCategoryDTO>{
  id:number;
}
