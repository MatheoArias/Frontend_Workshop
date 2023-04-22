import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyPercent'
})
export class CurrencyPercentPipe implements PipeTransform {

  transform(value: number): number {
    return Math.ceil(value/1000)*1000;
  }

}
