import { Customer } from "./customer.model";
import { Category } from "./category.model";

export interface Vehicles {
  id: 1,
  category:Category,
  owner: Customer
  license_plate: string,
  trademark: string,
  model: string
}

export interface CreateVehiclesDTO extends Omit<Vehicles, 'id' | 'category' |'owner'>{
  category:number,
  owner: number
}

export interface UpdateVehiclesDTO extends Omit<Vehicles, 'category' |'owner'>{
  category:number,
  owner: number
}


