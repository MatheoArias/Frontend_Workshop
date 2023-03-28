import { Component,Input,OnInit } from '@angular/core';
import { EmployeeTypeService } from 'src/app/services/employee-type.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employees,EmployesType,UpdateEmployeesDTO} from 'src/app/models/employee.model';
import { FormGroup,Validators,FormBuilder,FormControl } from '@angular/forms';
import { DocumentType } from 'src/app/models/document_type.models';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { UpdateCustomerDTO } from 'src/app/models/customer.model';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {

  employees:Employees[]=[]
  employeeTypes:EmployesType[]=[]
  documentTypes:DocumentType[]=[]
  employeesId:number=0;
  listFilter:Employees[]=[];

  messagges:string='';
  statusCode: number=0;
  statusDeatil:'Loading' | 'Success' | 'Error'| 'Init' = 'Init'
  valueFind=new FormControl('');
  itemFind:string="";
  filterpipe= new FilterPipe()
  formEmployee!:FormGroup


  get names(){
    return this.formEmployee.get('names');
  }
  get documentType(){
    return this.formEmployee.get('document_type');
  }
  get documentNumber(){
    return this.formEmployee.get('document_number');
  }
  get employeesType(){
    return this.formEmployee.get('employees_type');
  }
  get telephoneCel(){
    return this.formEmployee.get('telephone_cel');
  }
  get telephoneNumber(){
    return this.formEmployee.get('telephone_number');
  }
  get residenceAddress(){
    return this.formEmployee.get('residence_address');
  }
  get emailAddress(){
    return this.formEmployee.get('email_address');
  }


  private formAddEmployee(){
    this.formEmployee = this.formBuilder.group({
      names: ['', [Validators.required]],
      document_type: ['', [Validators.required]],
      document_number: ['', [Validators.required]],
      employees_type: ['', [Validators.required]],
      telephone_cel: ['', [Validators.required]],
      telephone_number: ['', [Validators.required]],
      residence_address: ['', [Validators.required]],
      email_address: ['', [Validators.required]],
    });
  }

  constructor(
    private employeeService:EmployeeService,
    private employeeTypeService:EmployeeTypeService,
    private documentTypeService:DocumentTypeService,
    private formBuilder:FormBuilder
  ){
    this.formAddEmployee();
  }

  ngOnInit(){
    this.getAllEmployees();
    this.getAllemployeesType();
    this.getAllDocumentsType();
 }

  getAllEmployees(){
    this.employeeService.getAllEmployees()
    .subscribe(data=>{
      this.employees=data;
      this.listFilter=data;
    });
  };

  getAllemployeesType(){
    this.employeeTypeService.getAllEmployeeTypes()
    .subscribe(data=>{
      this.employeeTypes=data;
    });
  };

  getAllDocumentsType(){
    this.documentTypeService.getAllDocumentType()
    .subscribe(data=>{
      this.documentTypes=data;
    }
  )}

  submit(event:Event){
    this.statusDeatil = 'Loading';
    const addEmployee=this.formEmployee.value
    if(this.formEmployee.valid){
      this.employeeService.createEmployee(addEmployee)
      .subscribe(data=>{
        this.getAllEmployees();
      });
      this.statusDeatil = 'Success';
      this.formEmployee.reset();
    }else{
      this.statusDeatil = 'Error';
      this.formEmployee.markAllAsTouched();
    }
  }

  updateEmployee() {
    const updateEmployee:UpdateEmployeesDTO=this.formEmployee.value;
    this.statusDeatil = 'Loading';
    if(this.formEmployee.valid){
      this.employeeService.updateEmployee(updateEmployee,this.employeesId)
      .subscribe(data=>{
        this.getAllEmployees();
      })
      this.formEmployee.reset();
      this.statusDeatil = 'Success';
    }else{
      this.formEmployee.markAllAsTouched();
      this.statusDeatil='Error';
    }
  }

  toggleUpdate(item:Employees) {
    this.statusDeatil = 'Loading';
    this.employeesId=item.id
    this.employeeService.getEmployee(item.id)
    .subscribe(data=>{
      this.formEmployee.patchValue(data);
      this.documentType?.setValue(data.document_type.id);
      this.employeesType?.setValue(data.employees_type.id);
      this.statusDeatil = 'Success';
    },
    (error) => {
      window.alert(error);
      this.statusDeatil = 'Error';
    })
  }

  toggleDelete(item:Employees){
    this.employeeService.deleteEmployee(item.id)
    .subscribe(data=>{
      this.getAllEmployees();
    })
  }

  onChangeText(){
    if(this.valueFind.value){
      this.itemFind=this.valueFind.value;
      this.listFilter=this.filterpipe.transform(this.employees,this.itemFind);
      this.employeesId=0;
    }else{
      this.itemFind="";
    }
  }
}
