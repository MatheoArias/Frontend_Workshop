import { DocumentType } from "./document_type.models"

export interface EmployesType{
  id: 0,
  jobs_names_cod: string,
  jobs_names: string
}

  //names:Mateo Arias Correa -string
  //employees_type: {
  //   id: 1 - number,
  //   jobs_names_cod:  TC-001 - string,
  //   jobs_names: vendedor - string
  // }
  // document_number:{
  //   id: 1 - number,
  //   types: C.C. - string,
  //   name: Cédula de ciudadania
  // },
  //telephone_number:312 45 45 - number - *** this is number of residence
  //telephone_cel: 312 593 56 56 - number
  //residence_address: Carrera 27A#52 -30 -string
  //percentage: 0.45 * 100 / the number comes of the data base in decimal
export interface Employees{
  id:number,
  names:string,
  employees_type:EmployesType,
  document_type:DocumentType
  document_number: number,
  telephone_number: number,
  telephone_cel: number,
  residence_address: string,
  email_address: string,
  percentage:number,
}

  //names:Mateo Arias Correa -string
  //employees_type: 1 - number
  //document_type: 1 - number
  //telephone_number:312 45 45 - number - *** this is number of residence
  //telephone_cel: 312 593 56 56 - number
  //residence_address: Carrera 27A#52 -30 -string
  //percentage: 0.45 * 100 / the number comes of the data base in decimal
export interface CreateEmployeesDTO extends Omit<Employees,'id'|'employees_type'|'document_type'>{
  employees_type:number,
  document_type:number
}

  //id :1 - number *** this is the  employee id
  //names:Mateo Arias Correa -string
  //employees_type: 1 - number
  //document_type:C.C. - string
  //telephone_number:312 45 45 - number - *** this is number of residence
  //telephone_cel: 312 593 56 56 - number
  //residence_address: Carrera 27A#52 -30 -string
  //percentage: 0.45 * 100 / the number comes of the data base in decimal
export interface UpdateEmployeesDTO extends Omit<Employees,'employees_type'|'document_type'>{
  employees_type:number,
  document_type:number
}
