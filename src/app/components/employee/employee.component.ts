import { Component,OnInit } from '@angular/core';
import { EmployeeTypeService } from 'src/app/services/employee-type.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { CreateEmployeesDTO, Employees,EmployesType,UpdateEmployeesDTO} from 'src/app/models/employee.model';
import { FormGroup,Validators,FormBuilder} from '@angular/forms';
import { DocumentType } from 'src/app/models/document_type.models';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {

  employeeTypes:EmployesType[]=[]
  employees:Employees[]=[]
  documentTypes:DocumentType[]=[]
  listFilter:Employees[]=[];

  employesType:EmployesType={
    id: 0,
    jobs_names_cod: '',
    jobs_names: ''
  }

  documentType:DocumentType={
    id: 0,
    types: '',
    name: ''
  }

  employee={
    id:0,
    names:'',
    employees_type:this.employesType,
    document_type:this.documentType,
    document_number: 0,
    telephone_number: 0,
    telephone_cel: 0,
    residence_address: '',
    email_address: '',
    percentage:0
  }

  itemFind="";
  filterpipe= new FilterPipe()

  statusDeatil:'Loading' | 'Success' | 'Error'| 'Init' = 'Init'

  formEmployee!:FormGroup
  get names(){
    return this.formEmployee.get('names');
  }
  get inputDocumentType(){
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
  get percentage(){
    return this.formEmployee.get('percentage');
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
      percentage: ['', [Validators.required]],
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

  //This function is for get all employees
  getAllEmployees(){
    this.employeeService.getAllEmployees()
    .subscribe(data=>{
      this.employees=data;
      this.listFilter=data;
    });
  }

  //This function is for get all employees
  getAllemployeesType(){
    this.employeeTypeService.getAllEmployeeTypes()
    .subscribe(data=>{
      this.employeeTypes=data;
    });
  }

  //This function is for get all Document Type
  getAllDocumentsType(){
    this.documentTypeService.getAllDocumentType()
    .subscribe(data=>{
      this.documentTypes=data;
    }
  )}


  //This function is for send new employee to data base
  //names:Mateo Arias Correa -string
  //employees_type: 1- number
  //document_type: 1 - number
  //telephone_number:312 45 45 - number - ***this is number of residence
  //telephone_cel: 312 593 56 56 - number
  //residence_address: Carrera 27A#52 -30 -string
  //percentage: 45 / 100 = 45 - number - the number come in to the input component
  submit(event:Event){
    event.preventDefault();
    this.statusDeatil = 'Loading';
    const addEmployee:CreateEmployeesDTO={
      names:this.names?.value,
      employees_type:this.employeesType?.value,
      document_type:this.inputDocumentType?.value,
      document_number: this.documentNumber?.value,
      telephone_number: this.telephoneNumber?.value,
      telephone_cel: this.telephoneNumber?.value,
      residence_address:this.residenceAddress?.value,
      email_address: this.emailAddress?.value,
      percentage:this.percentage?. value / 100
    }
    if(this.formEmployee.valid){
      this.employeeService.createEmployee(addEmployee)
      .subscribe(()=>{
        this.getAllEmployees();
      },()=>{
        Swal.fire({
          icon: 'error',
          confirmButtonText: 'Regresar',
          title: 'Error',
          html: `ha ocurrido un error en el momento de eliminar el empleado`,
        })
        this.statusDeatil='Error';
      });
      this.statusDeatil = 'Success';
      Swal.fire({
        icon: 'success',
        confirmButtonText: 'Regresar',
        title: 'Empleado agregado con éxito',
        html: `El empleado: <strong>${this.names?.value}</strong> fue agregado con éxito`,
      })
      this.formEmployee.reset();
    }else{
      Swal.fire({
        icon: 'error',
        confirmButtonText: 'Regresar',
        title: 'Error',
        html: `Ocurrio un error al llenar el formulario`,
      })
      this.statusDeatil = 'Error';
      this.formEmployee.markAllAsTouched();
    }
  }

  //This function is for update employee in data base
  //id :1 - number *** this is the  employee id selected
  //names:Mateo Arias Correa -string
  //employees_type: 1 -number
  //document_type: 1 - number
  //telephone_number:312 45 45 - number - *** this is number of residence
  //telephone_cel: 312 593 56 56 - number
  //residence_address: Carrera 27A#52 -30 -string
  //percentage: 45 / 100 = 45 - number - the number come in to the input component
  updateEmployee() {
    const updateEmployee: UpdateEmployeesDTO = {
      id:this.employee.id,
      names: this.names?.value,
      employees_type: this.employeesType?.value,
      document_type: this.inputDocumentType?.value,
      document_number: this.documentNumber?.value,
      telephone_number: this.telephoneNumber?.value,
      telephone_cel: this.telephoneNumber?.value,
      residence_address: this.residenceAddress?.value,
      email_address: this.emailAddress?.value,
      percentage: this.percentage?.value / 100
    };
    this.statusDeatil = 'Loading';
    if(this.formEmployee.valid){
      this.employeeService.updateEmployee(updateEmployee,this.employee.id)
      .subscribe(()=>{
        this.getAllEmployees();
      },()=>{
        Swal.fire({
          icon: 'error',
          confirmButtonText: 'Regresar',
          title: 'Error',
          html: `ha ocurrido un error en el momento modificar el empleado`,
        })
        this.statusDeatil='Error';
      })
      this.statusDeatil = 'Success';
      Swal.fire({
        icon: 'success',
        confirmButtonText: 'Regresar',
        title: 'Empleado modificado con éxito',
        html: `El empleado: <strong>${this.names?.value}</strong> fue modificado con éxito`,
      })
      this.formEmployee.reset();
    }else{
      Swal.fire({
        icon: 'error',
        confirmButtonText: 'Regresar',
        title: 'Error',
        html: `Ocurrio un error al llenar el formulario`,
      })
      this.formEmployee.markAllAsTouched();
      this.statusDeatil='Error';
    }
  }

  //This function is for selected employeee in the list
  //id :1 - number *** this is the  employee id selected
  //names:Mateo Arias Correa -string
  //employees_type: Vendedor(02) -string
  //document_type:C.C. - string
  //telephone_number:312 45 45 - number - *** this is number of residence
  //telephone_cel: 312 593 56 56 - number
  //residence_address: Carrera 27A#52 -30 -string
  //percentage: 0.45 * 100 / the number comes of the data base in decimal
  toggleUpdate(item:Employees) {
    this.statusDeatil = 'Loading';
    this.employee=item
    this.employeeService.getEmployee(item.id)
      .subscribe(data=>{
        this.formEmployee.patchValue(data);
        this.inputDocumentType?.setValue(data.document_type.id);
        this.employeesType?.setValue(data.employees_type.id);
        this.percentage?.setValue(data.percentage * 100);
        this.statusDeatil = 'Success';
      },
      () => {
        Swal.fire({
          icon: 'error',
          confirmButtonText: 'Regresar',
          title: 'Error',
          html: `ha ocurrido un error en el momento de seleccionar el empleado`,
        })
        this.statusDeatil='Error'
        this.statusDeatil = 'Error';
      })
  }

  //This function is for delete employee in the data base
  //id : 1 -number *** This number is employee id selected
  toggleDelete(item:Employees){
    this.statusDeatil = 'Loading';
    if(item.id){
      this.employeeService.deleteEmployee(item.id)
      .subscribe(()=>{
        this.getAllEmployees();
      },()=>{
        Swal.fire({
          icon: 'error',
          confirmButtonText: 'Regresar',
          title: 'Error',
          html: `ha ocurrido un error en el momento de eliminar el empleado`,
        })
        this.statusDeatil='Error'
      })
      Swal.fire({
        icon: 'success',
        confirmButtonText: 'Regresar',
        title: 'Empleado eliminado con éxito',
        html: `El Empleado fue eliminado con éxito`,
      })
      this.formEmployee.reset();
      this.employesType={
        id: 0,
        jobs_names_cod: '',
        jobs_names: ''
      }

      this.documentType={
        id: 0,
        types: '',
        name: ''
      }

      this.employee={
        id:0,
        names:'',
        employees_type:this.employesType,
        document_type:this.documentType,
        document_number: 0,
        telephone_number: 0,
        telephone_cel: 0,
        residence_address: '',
        email_address: '',
        percentage:0
      }
      this.statusDeatil = 'Success';
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

  //This function is for recived item value for app-input-find, later, itemFind is parameter of filterPipe for fiilter products list
  reciveValueFind(item: string){
    this.employesType={
      id: 0,
      jobs_names_cod: '',
      jobs_names: ''
    }

    this.documentType={
      id: 0,
      types: '',
      name: ''
    }

    this.employee={
      id:0,
      names:'',
      employees_type:this.employesType,
      document_type:this.documentType,
      document_number: 0,
      telephone_number: 0,
      telephone_cel: 0,
      residence_address: '',
      email_address: '',
      percentage:0
    }
    if(item){
      this.itemFind=item
      this.listFilter=this.filterpipe.transform(this.employees,item);
    }else{
      this.itemFind="";
    }
  }
}
