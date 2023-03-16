import { Component,OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { DocumentType } from 'src/app/models/document_type.models';
import { CustomerService } from 'src/app/services/customer.service';
import { DocumentTypeService } from 'src/app/services/document-type.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  documentType:DocumentType[]=[]
  customers:Customer[] = [];

  constructor(
    private customerService:CustomerService,
    private documentTypeService:DocumentTypeService
  ){}

  ngOnInit(){
    this.getAllCustomer();
    this.getAllDocumentType();
  }

  getAllCustomer(){
    return this.customerService.getAllCustomer()
    .subscribe(data=>{
      this.customers=data
    });
  }

  getAllDocumentType(){
    return this.documentTypeService.getAllDocumentType()
    .subscribe(data=>{
      this.documentType=data;
    })
  }

}
