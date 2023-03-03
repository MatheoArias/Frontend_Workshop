export interface Category{
  id:number;
  category: string;
}

export interface CreateCategoryDTO extends Omit <Category,'id'>{

}

export interface UpdateaCategoryDTO extends Partial<CreateCategoryDTO>{
  id:number;
}
