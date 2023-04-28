export interface Users {
  id: number,
  last_login: Date,
  username: string,
  email: string,
  name: string,
  last_name: string,
  is_active: boolean,
  is_staff: boolean,
  is_superuse: boolean,
  groups: [],
  user_permissions: []
}

export interface CreateUsersDto extends Omit<Users,'id'>{
  password: string
}

export type GetAllUsers = Omit<Users,'password'>

export type UpdateProductsDTO = Partial<Users>

export interface UserNav{
  names:string,
  position:string,
}
