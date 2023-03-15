export interface DocumentType {
  id: number,
  types: string,
  name: string
}

export interface CreateDocumentTypeDTO extends Omit<DocumentType,'id'>{
}
