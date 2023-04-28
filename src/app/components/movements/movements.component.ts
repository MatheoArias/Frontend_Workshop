import { Component,OnInit} from '@angular/core';
import { BuyProductsService } from 'src/app/services/buy-products.service';
import { SellProductsService } from 'src/app/services/sell-products.service';
import { Movements,MovementesChart} from 'src/app/models/product.model';
import { ScaleType } from '@swimlane/ngx-charts';
import { FormControl} from '@angular/forms';
@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss'],

})
export class MovementsComponent implements OnInit {
  intervalTime = new FormControl('year');
  stateButton:string | null='year';

  movements: Movements[] = [];
  movement: Movements = {
    description: '',
    code: '',
    stock: 0,
    date: new Date(),
    bill: '',
    totals_stock: 0,
    category: 'Entrada',
    total_value: 0,
  };

  // options
  gradient= true;
  showLegend= true;
  showLabels= true;
  isDoughnut= false;

  dataMoevements:MovementesChart[]=[]
  data: MovementesChart={
    name:'',
    value: 0
  };
  colorScheme = {
    domain: ['#F47A82', '#5fe39f'],
    name: 'colorScheme',
    selectable: true,
    group: ScaleType.Linear,
  };

  constructor(
    private buyProductsService: BuyProductsService,
    private sellProductsService: SellProductsService
  ) {}

  ngOnInit() {
    this.getSellProducts();
    this.getBuysProducts();
  }

  getSellProducts() {
    this.sellProductsService.getAllSellProducts()
    .subscribe(data=> {
      data.map((item) => {
        this.movement = {
          description: item.product_id.description,
          code: item.product_id.code,
          stock: item.sell_stock,
          date: item.sell_date,
          bill: item.sell_bill,
          totals_stock: item.product_id.totals_stock,
          total_value:  item.sell_stock * item.product_id.unit_value,
          category: 'Salida',
        };
        /*******************************************************/
        this.movements.push(this.movement);
        this.movements.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      });
      this.onClickIntervalTime(this.movements,this.intervalTime.value);
    });

  }

  getBuysProducts() {
    this.buyProductsService.getAllBuyProducts()
    .subscribe(data => {
      data.map((item) => {
        this.movement = {
          description: item.product_id.description,
          code: item.product_id.code,
          stock: item.buys_stock,
          date: item.buys_date,
          bill: item.buys_bill,
          totals_stock: item.buys_stock * item.buys_unit_value,
          total_value: item.buys_unit_value,
          category: 'Entrada',
        };
        this.movements.push(this.movement);
        this.movements.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      });
      this.onClickIntervalTime(this.movements,this.intervalTime.value);
    });

  }

  onClickIntervalTime(movements:Movements[],input:unknown){
    if(input==='year'){
      const listOutflow = movements.filter(
        item => new Date(item.date).getFullYear() === new Date().getFullYear()
         && item.category=='Salida');
      const totalOutflow= listOutflow.reduce((sum, item) => item.totals_stock + sum,0);

      const listIntFlow = movements.filter(
        item => new Date(item.date).getFullYear() === new Date().getFullYear()
        && item.category=='Entrada');
     const totalIntflow = listIntFlow.reduce((sum, item) => item.totals_stock + sum,0)

      this.dataMoevements=[
        {
          name: "Entradas",
          value: totalIntflow
        },
        {
          name: "Salidas",
          value: totalOutflow
        }
      ]
    }else{
      const listOutflow = movements.filter(
        item =>
         new Date(item.date).getFullYear() === new Date().getFullYear() &&
         new Date(item.date).getMonth() === new Date().getMonth() &&
         item.category=='Salida' );
      const totalOutflow= listOutflow.reduce((sum, item) => item.totals_stock + sum,0);

      const listIntFlow = movements.filter(
        item =>
         new Date(item.date).getFullYear() === new Date().getFullYear() &&
         new Date(item.date).getMonth()=== new Date().getMonth() &&
         item.category=='Entrada');
      const totalIntflow = listIntFlow.reduce((sum, item) => item.totals_stock + sum,0)

      this.dataMoevements=[
        {
          name: "Entradas",
          value: totalIntflow
        },
        {
          name: "Salidas",
          value: totalOutflow
        }
      ]
    }
  }

  onGetYearMovements(){
    this.onClickIntervalTime(this.movements,this.intervalTime.value);
  }

  onChangeInput(){
    this.stateButton=this.intervalTime.value;
  }
}
