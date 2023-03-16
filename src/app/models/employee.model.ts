import { DocumentType } from "./document_type.models"

export interface EmployesType{
  id: 1,
  jobs_names_cod: string,
  jobs_names: string
}

export interface Employees{
  id:number,
  names:string,
  employees_type:EmployesType,
  document_type:DocumentType
  document_number: number,
  telephone_number: number,
  telephone_cel: number,
  address_residence: string,
  email_address: string,
}

export interface CreateEmployeesDTO extends Omit<Employees,'id'|'employees_type'|'document_type'>{
  employees_type:number,
  document_type:number
}

export interface UpdateEmployeesDTO extends Omit<Employees,'employees_type'|'document_type'>{
  employees_type:number,
  document_type:number
}
