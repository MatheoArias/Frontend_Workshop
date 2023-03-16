import { Component,Input,OnInit } from '@angular/core';
import { EmployeeTypeService } from 'src/app/services/employee-type.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employees,EmployesType,UpdateEmployeesDTO} from 'src/app/models/employee.model';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { DocumentType } from 'src/app/models/document_type.models';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { UpdateCustomerDTO } from 'src/app/models/customer.model';

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

  formEmployee!:FormGroup

  messagges:string='';
  statusCode: number=0;
  statusDeatil:'Loading' | 'Success' | 'Error'| 'Init' = 'Init'


  get inputDocumentType(){
    return this.formEmployee.get('document_type');
  }
  get inputEmployeesType(){
    return this.formEmployee.get('employees_type');
  }

  formAddEmployee(){
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
      this.inputDocumentType?.setValue(data.document_type.id);
      this.inputEmployeesType?.setValue(data.employees_type.id);
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
}
