import { Component,Output,EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import { FilterPipe } from 'src/app/pipes/filter.pipe';


@Component({
  selector: 'app-input-find',
  templateUrl: './input-find.component.html',
  styleUrls: ['./input-find.component.scss']
})

export class InputFindComponent {

  valueFind=new FormControl('');
  itemFind="";

  filterpipe= new FilterPipe();

  @Output() valueFindEvent = new EventEmitter<string>();

  onChangeText(){
    if(this.valueFind.value){
      this.itemFind=this.valueFind.value;
      this.valueFindEvent.emit(this.itemFind);
    }else{
      this.valueFindEvent.emit('');
    }
  }
}
