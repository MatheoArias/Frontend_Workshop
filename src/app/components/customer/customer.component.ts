import { Component,Input } from '@angular/core';
import { Customer,UpdateCustomerDTO } from 'src/app/models/customer.model';
import { DocumentType } from 'src/app/models/document_type.models';
import { CustomerService } from 'src/app/services/customer.service';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent {

  @Input() documentType:DocumentType[]=[]
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

  statusDeatil:'Loading' | 'Success' | 'Error'| 'Init' = 'Init'
  itemFind="";
  filterpipe= new FilterPipe()

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

  //This function is for get all customer
  getAllCustomer(){
    return this.customerService.getAllCustomer()
    .subscribe(data=>{
      this.customers=data;
    });
  }

  //This function is for get all Document Type
  getAllDocumentType(){
    return this.documentTypeServices.getAllDocumentType()
    .subscribe(data=>{
      this.documentType=data;
    })
  }

  //This function is for send Customer to data base
  //   names: Mateo Arias Correa - string,
  //   document_number: 1 -number,
  //   telephone_number: 454 55 89 *** this is the  residence telephone number,
  //   telephone_cel: 312 338 56 56 - number,
  //   residence_address: Carrea 67A $ 55 - string,
  //   email_address: teoarco@gmail.com - string,
  //   document_type: 1 - number *** this is the document type id

  submit(event:Event){
    event.preventDefault();
    const addCustomer=this.formCustomer.value;
    if(this.formCustomer.valid){
      this.customerService.createCustomer(addCustomer)
      .subscribe(()=>{
        this.getAllCustomer();
      },()=>{
        Swal.fire({
          icon: 'error',
          confirmButtonText: 'Regresar',
          title: 'Error',
          html: `ha ocurrido un error en el momento de eliminar el cliente`,
        })
        this.statusDeatil='Error';
      })
      Swal.fire({
        icon: 'success',
        confirmButtonText: 'Regresar',
        title: 'Cliente agregado con éxito',
        html: `El cliente: <strong>${this.inputNames?.value}</strong> fue agregado con éxito`,
      })
      this.statusDeatil='Success';
      this.formCustomer.reset();
    }else{
      Swal.fire({
        icon: 'error',
        confirmButtonText: 'Regresar',
        title: 'Error',
        html: `Ocurrio un error al llenar el formulario`,
      })
      this.statusDeatil='Error';
      this.formCustomer.markAllAsTouched();
    }
  }

  //This function is for update employee in data base
  //   id:0 - number - this is the customer selected
  //   names: Mateo Arias Correa - string,
  //   document_number: 0 - number,
  //   telephone_number: 454 55 89 *** this is the  residence telephone number,
  //   telephone_cel: 312 338 56 56 - number,
  //   residence_address: Carrea 67A $ 55 - string,
  //   email_address: teoarco@gmail.com - string,
  //   document_type: 1 - number *** this is the document type id
  updateCustomer(){
    const updateCustomer:UpdateCustomerDTO=this.formCustomer.value;
    this.statusDeatil='Loading';
    if(this.formCustomer.valid){
      this.customerService.updateCustomer(updateCustomer,this.customer.id)
      .subscribe(()=>{
        this.getAllCustomer();
      },()=>{
        Swal.fire({
          icon: 'error',
          confirmButtonText: 'Regresar',
          title: 'Error',
          html: `ha ocurrido un error en el momento de modificar el cliente`,
        })
        this.statusDeatil='Error';
      })
      Swal.fire({
        icon: 'success',
        confirmButtonText: 'Regresar',
        title: 'Cliente modificado con éxito',
        html: `El cliente: <strong>${this.inputNames?.value}</strong> fue modificado con éxito`,
      })
      this.statusDeatil='Success';
      this.formCustomer.reset();
    }else{
      Swal.fire({
        icon: 'error',
        confirmButtonText: 'Regresar',
        title: 'Error',
        html: `Ocurrio un error al llenar el formulario`,
      })
      this.formCustomer.markAllAsTouched();
      this.statusDeatil='Error';
    }
  }

  //This function is for selected employee
  //   id: 1 - number ***
  //   names: Mateo Arias Correa - string,
  //   document_number: 0 - number,
  //   telephone_number: 454 55 89 *** this is the  residence telephone number,
  //   telephone_cel: 312 338 56 56 - number,
  //   residence_address: Carrea 67A $ 55 - string,
  //   email_address: teoarco@gmail.com - string,
  //   document_type: 1 - number *** this is the document type id
  toggleUpdate(item:Customer){
    this.statusDeatil='Loading';
    this.customer=item
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

  //This function is for delete cusromer in the data base
  //id : 1 -number *** This number is id customer selected
  toggleDelete(item:Customer){
    this.statusDeatil='Loading';
    if(item.id){
      this.customerService.deleteCustomer(item.id)
      .subscribe(()=>{
        this.getAllCustomer();
      },()=>{
        Swal.fire({
          icon: 'error',
          confirmButtonText: 'Regresar',
          title: 'Error',
          html: `ha ocurrido un error en el momento de eliminar el cliente`,
        })
        this.statusDeatil='Error'
      })
      Swal.fire({
        icon: 'success',
        confirmButtonText: 'Regresar',
        title: 'Cliente eliminado con éxito',
        html: `El Cliente fue eliminado con éxito`,
      })
      this.statusDeatil='Success';
      this.formCustomer.reset()
    }else{
      Swal.fire({
        icon: 'error',
        confirmButtonText: 'Regresar',
        title: 'Error',
        html: `Ocurrio un error al llenar el formulario`,
      })
      this.statusDeatil='Error';
    }
  }

  //This function is for recived item find to app-input-find, leter, itemFind is parameter of filterPipe for filter list customer
  reciveValueFind(item: string) {
    this.customer = {
      id: 0,
      names: '',
      document_number: 0,
      telephone_number: 0,
      telephone_cel: 0,
      residence_address: '',
      email_address: '',
      document_type: {
        id: 0,
        types: '',
        name: ''
      },
    }

    if (item) {
      this.itemFind = item
      this.listFilter = this.filterpipe.transform(this.customers, item);
    } else {
      this.itemFind = "";
    }
  }

}
