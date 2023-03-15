import { DocumentType } from "./document_type.models"

export interface Customer{
  id: number,
  document_type: DocumentType,
  names: string,
  document_number: number,
  telephone_number: number,
  telephone_cel: number,
  residence_address: string,
  email_address: string,
}

export interface CreateCustomerDTO extends Omit<Customer,'id' | 'document_type'>{
  document_type: number
}

export interface UpdateCustomerDTO extends Omit<Customer, 'document_type'>{
  document_type: number
}
