import { Component,Input } from '@angular/core';
import { Customer,UpdateCustomerDTO,CreateCustomerDTO } from 'src/app/models/customer.model';
import { DocumentType } from 'src/app/models/document_type.models';
import { CustomerService } from 'src/app/services/customer.service';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent {

  customerId:number=0;
  messagges:string='';
  statusCode: number=0;
  statusDeatil:'Loading' | 'Success' | 'Error'| 'Init' = 'Init'
  valueFind=new FormControl('');
  itemFind:string="";
  filterpipe= new FilterPipe()


  @Input()documentType:DocumentType[]=[]
  @Input() customers:Customer[] = [];
  @Input() listFilter:Customer[]=[];
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

  get inputNames(){
    return this.formCustomer.get('names');
  }
  get inputDocumentType(){
    return this.formCustomer.get('document_type');
  }
  get inputDocumentNumber(){
    return this.formCustomer.get('document_number');
  }
  get residenceAddress(){
    return this.formCustomer.get('residence_address');
  }
  get telephone(){
    return this.formCustomer.get('telephone_number');
  }
  get celphone(){
    return this.formCustomer.get('telephone_cel');
  }
  get emailAddress(){
    return this.formCustomer.get('email_address');
  }

  private formAddCustomer() {
    this.formCustomer = this.formBuilder.group({
      names: ['', [Validators.required]],
      document_type: ['', [Validators.required]],
      document_number: ['', [Validators.required]],
      residence_address: ['', [Validators.required]],
      telephone_cel: ['', [Validators.required]],
      telephone_number: ['', [Validators.required]],
      email_address: ['', [Validators.required,Validators.email]],
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
      this.customers=data;
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
      this.customerService.updateCustomer(updateCustomer,this.customerId)
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
    this.customerId=item.id
    if(item.id){
      this.customerService.getCustomer(item.id)
      .subscribe(data => {
        this.formCustomer.patchValue(data);
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

  onChangeText(){
    if(this.valueFind.value){
      this.itemFind=this.valueFind.value;
      this.listFilter=this.filterpipe.transform(this.customers,this.itemFind);
      this.customerId=0;
    }else{
      this.itemFind="";
    }
  }

}
