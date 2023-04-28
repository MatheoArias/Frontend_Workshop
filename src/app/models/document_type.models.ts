export interface DocumentType {
  id: number,
  types: string,
  name: string
}

export type CreateDocumentTypeDTO = Omit<DocumentType,'id'>
