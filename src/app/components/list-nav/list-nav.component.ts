import { Component,Input} from '@angular/core';

@Component({
  selector: 'app-list-nav',
  templateUrl: './list-nav.component.html',
  styleUrls: ['./list-nav.component.scss']
})
export class ListNavComponent {


  @Input() navState=false;

  listStateInventory = false;
  listStateSell = false
  listStateCustomers = false;
  listStateVehicles = false;
  listStateEmployees = false;


  //This functions are called when i want open the items list. Each funtion open one list items
  onActivateInventory() {
    this.listStateInventory = !this.listStateInventory;
    this.listStateSell = false
    this.listStateCustomers = false;
    this.listStateVehicles = false;
    this.listStateEmployees = false;
  }

  onActivateSell() {
    this.listStateSell = !this.listStateSell;
    this.listStateInventory = false
    this.listStateCustomers = false;
    this.listStateVehicles = false;
    this.listStateEmployees = false;
  }

  onActivateCustomer() {
    this.listStateCustomers = !this.listStateCustomers;
    this.listStateInventory = false
    this.listStateSell = false
    this.listStateVehicles = false;
    this.listStateEmployees = false;
  }

  onActivateVehicle() {
    this.listStateVehicles = !this.listStateVehicles;
    this.listStateInventory = false
    this.listStateSell = false
    this.listStateCustomers = false;
    this.listStateEmployees = false;
  }

  onActivateEmployee() {
    this.listStateEmployees = !this.listStateEmployees;
    this.listStateInventory = false
    this.listStateSell = false
    this.listStateCustomers = false;
    this.listStateVehicles = false;
  }

  OnCloseNav() {
    this.navState = !this.navState;
  }

}
