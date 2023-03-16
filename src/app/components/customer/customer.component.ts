import { Component,Input } from '@angular/core';
import { Customer,UpdateCustomerDTO,CreateCustomerDTO } from 'src/app/models/customer.model';
import { DocumentType } from 'src/app/models/document_type.models';
import { CustomerService } from 'src/app/services/customer.service';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent {

  CustomerId:number=0;
  messagges:string='';
  statusCode: number=0;
  statusDeatil:'Loading' | 'Success' | 'Error'| 'Init' = 'Init'

  @Input()documentType:DocumentType[]=[]
  @Input() customers:Customer[] = [];
  customer:Customer={
      id: 0,
      names: '',
      document_number: 0,
      telephone_number: 0,
      telephone_cel: 0,
      residence_address: '',
      email_address: '',
      document_type:{
        id: 0,
        types: '',
        name: ''
      },
  }

  formCustomer!:FormGroup;

  get inputDocumentType(){
    return this.formCustomer.get('document_type')
  }

  private formAddCustomer() {
    this.formCustomer = this.formBuilder.group({
      names: ['', [Validators.required]],
      document_type: ['', [Validators.required]],
      document_number: ['', [Validators.required]],
      residence_address: ['', [Validators.required]],
      telephone_cel: ['', [Validators.required]],
      telephone_number: ['', [Validators.required]],
      email_address: ['', [Validators.required]],
    });
  }

  constructor(
    private customerService: CustomerService,
    private documentTypeServices:DocumentTypeService,
    private formBuilder: FormBuilder
  ){
    this.formAddCustomer();
  }

  getAllCustomer(){
    return this.customerService.getAllCustomer()
    .subscribe(data=>{
      this.customers=data
    });
  }

  getAllDocumentType(){
    return this.documentTypeServices.getAllDocumentType()
    .subscribe(data=>{
      this.documentType=data;
    })
  }

  submit(event:Event){
    const addCustomer=this.formCustomer.value;
    if(this.formCustomer.valid){
      this.customerService.createCustomer(addCustomer)
      .subscribe(data=>{
        this.getAllCustomer();
      })
      this.statusDeatil='Success';
      this.formCustomer.reset();
    }else{
      this.statusDeatil='Error';
      this.formCustomer.markAllAsTouched();
    }
  }

  updateCustomer(){
    const updateCustomer:UpdateCustomerDTO=this.formCustomer.value;
    this.statusDeatil='Loading';
    if(this.formCustomer.valid){
      this.customerService.updateCustomer(updateCustomer,this.CustomerId)
      .subscribe(data=>{
        this.getAllCustomer();
      })
      this.formCustomer.reset();
      this.statusDeatil='Success';
    }else{
      this.formCustomer.markAllAsTouched();
      this.statusDeatil='Error';
    }
  }

  toggleUpdate(item:Customer){
    this.statusDeatil='Loading';
    this.CustomerId=item.id
    if(item.id){
      this.customerService.getCustomer(item.id)
      .subscribe(data => {
        this.formCustomer.patchValue(data);
        this.CustomerId = data.id;
        this.inputDocumentType?.setValue(data.document_type.id);
      });
      this.statusDeatil='Success';
    }else{
      this.statusDeatil='Error';
    }
  }

  toggleDelete(item:Customer){
    this.statusDeatil='Loading';
    if(item.id){
      this.customerService.deleteCustomer(item.id)
      .subscribe(data=>{
        this.getAllCustomer();
      })
      this.statusDeatil='Success';
    }else{
      this.statusDeatil='Error';
    }
  }

}
