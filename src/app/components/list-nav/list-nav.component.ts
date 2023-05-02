import { Component,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-list-nav',
  templateUrl: './list-nav.component.html',
  styleUrls: ['./list-nav.component.scss']
})
export class ListNavComponent {


  @Input() navState=false;
  @Output() navStateEmit= new EventEmitter<boolean>();

  listStateInventory = false;
  listStateSell = false
  listStateCustomers = false;
  listStateVehicles = false;
  listStateEmployees = false;
  listStateUsers=false;

  //this function is for send modal State to products component
  OnCloseNav(){
    this.navState =false;
    this.navStateEmit.emit(this.navState);
  }

  //This functions are called when i want open the items list. Each funtion open one list items
  onActivateInventory() {
    this.listStateInventory = !this.listStateInventory;
    this.listStateSell = false
    this.listStateCustomers = false;
    this.listStateVehicles = false;
    this.listStateEmployees = false;
    this.listStateUsers=false;
  }

  onActivateSell() {
    this.listStateSell = !this.listStateSell;
    this.listStateInventory = false
    this.listStateCustomers = false;
    this.listStateVehicles = false;
    this.listStateEmployees = false;
    this.listStateUsers=false;
  }

  onActivateCustomer() {
    this.listStateCustomers = !this.listStateCustomers;
    this.listStateInventory = false
    this.listStateSell = false
    this.listStateVehicles = false;
    this.listStateEmployees = false;
    this.listStateUsers=false;
  }

  onActivateVehicle() {
    this.listStateVehicles = !this.listStateVehicles;
    this.listStateInventory = false
    this.listStateSell = false
    this.listStateCustomers = false;
    this.listStateEmployees = false;
    this.listStateUsers=false;
  }

  onActivateEmployee() {
    this.listStateEmployees = !this.listStateEmployees;
    this.listStateInventory = false
    this.listStateSell = false
    this.listStateCustomers = false;
    this.listStateVehicles = false;
    this.listStateUsers=false;
  }

  onActivateUser(){
    this.listStateUsers=!this.listStateUsers;
    this.listStateEmployees = false;
    this.listStateInventory = false
    this.listStateSell = false
    this.listStateCustomers = false;
    this.listStateVehicles = false;
  }
}
