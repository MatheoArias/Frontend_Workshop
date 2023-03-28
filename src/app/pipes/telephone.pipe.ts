import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telephone'
})
export class TelephonePipe implements PipeTransform {

  transform(value: number): string {

    let lengthNumber=value.toString().split('')
    if(lengthNumber.length==10 && lengthNumber[0]!='6'){
      return `
      ${lengthNumber[0]}${lengthNumber[1]}${lengthNumber[2]}-${lengthNumber[3]}${lengthNumber[4]}${lengthNumber[5]}-${lengthNumber[6]}${lengthNumber[7]}${lengthNumber[8]}${lengthNumber[9]}`
    }else{
      return `
      ${lengthNumber[0]}${lengthNumber[1]}${lengthNumber[2]}-${lengthNumber[3]}${lengthNumber[4]}-${lengthNumber[5]}${lengthNumber[6]}`
    }
  }

}
