export interface Category{
  id:           number;
  categories: string;
}

export interface CreateCategoryDTO extends Omit <Category,'id'>{

}

export interface UpdateaCategoryDTO extends Partial<CreateCategoryDTO>{
  id:number;
}
