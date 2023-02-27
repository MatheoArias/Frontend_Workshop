import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  navState=false;
  listState=false;

  toggleShowNav(){
    this.navState=!this.navState;
  }

  toggleActivateList(){
    this.listState=!this.listState;
  }

  toggleChooseList(){
    if(this.navState==false){
      this.listState=!this.listState;
    }else{
      this.listState=!this.listState;
      this.navState=!this.navState;
    }
  }

}
