import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  navState=false;
  buttonState=false;
  listState=false;

  toggleShowNav(){
    this.buttonState=!this.buttonState;
    this.navState=!this.navState;
  }

  toggleActivateList(){
    this.listState=!this.listState;
  }

}
