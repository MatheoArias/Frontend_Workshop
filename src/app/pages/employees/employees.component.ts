import { Component,OnInit } from '@angular/core';
import { Employees,EmployesType } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent{

  employees:Employees[]=[]
  employeeTypes:EmployesType[]=[]

  constructor(
  ){}

}
