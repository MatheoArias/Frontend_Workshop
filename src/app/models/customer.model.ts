import { DocumentType } from "./document_type.models"

// names: Mateo Arias Correa -string,
// document_number:{
//   id: 1 - number,
//   types: C.C. - string,
//   name: Cédula de ciudadania
// },
// telephone_number: 454 55 89 *** this is the  residence telephone number,
// telephone_cel: 312 338 56 56 - number,
// residence_address: Carrea 67A $ 55 - string,
// email_address: teoarco@gmail.com - string,
// document_type: 1 - number *** this is the document type id
export interface Customer {
  id: number,
  document_type: DocumentType,
  names: string,
  document_number: number,
  telephone_number: number,
  telephone_cel: number,
  residence_address: string,
  email_address: string,
}

// names: Mateo Arias Correa -string,
// document_number: 1 - number *** This is the document Type id
// telephone_number: 454 55 89 *** this is the  residence telephone number,
// telephone_cel: 312 338 56 56 - number,
// residence_address: Carrea 67A $ 55 - string,
// email_address: teoarco@gmail.com - string,
// document_type: 1 - number *** this is the document type id
export interface CreateCustomerDTO extends Omit<Customer, 'id' | 'document_type'> {
  document_type: number
}

//id: 1 - number -this is the customer id
// names: Mateo Arias Correa -string,
// document_number:1 - number *** This is the document Type id
// telephone_number: 454 55 89 *** this is the  residence telephone number,
// telephone_cel: 312 338 56 56 - number,
// residence_address: Carrea 67A $ 55 - string,
// email_address: teoarco@gmail.com - string,
// document_type: 1 - number *** this is the document type id


export interface UpdateCustomerDTO extends CreateCustomerDTO {
  id:number
}
