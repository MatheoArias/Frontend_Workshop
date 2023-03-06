import { Component,OnInit} from '@angular/core';
import {BuyProducts,UpdateBuysProductDTO,createBuysProductDTO,} from 'src/app/models/buy_product.model';
import { SellProducts} from 'src/app/models/sell_product.model';
import { BuyProductsService } from 'src/app/services/buy-products.service';
import { SellProductsService } from 'src/app/services/sell-products.service';
import { BuysProductsComponent } from '../buys-products/buys-products.component';
import { Product,Movements } from 'src/app/models/product.model';
@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss'],
})
export class MovementsComponent implements OnInit {

  movement: Movements = {
    description: '',
    code: '',
    stock: 0,
    date: new Date(),
    bill: '',
    totals_stock: 0,
    category: '',
  };
  movements: Movements[] = [];

  constructor(
    private buyProductsService: BuyProductsService,
    private sellProductsService: SellProductsService
  ) {}

  ngOnInit() {
    this.getSellProducts();
    this.getBuysProducts();
  }

  getSellProducts() {
    this.sellProductsService.getAllSellProducts().subscribe((data) => {
      data.map((item) => {
        this.movement = {
          description: item.product_id.description,
          code: item.product_id.code,
          stock: item.sell_stock,
          date: item.sell_date,
          bill: item.sell_bill,
          totals_stock: item.product_id.totals_stock,
          category: 'Salida',
        };
        this.movements.push(this.movement);
        this.movements.sort((a,b)=>new Date(b.stock).getMonth()-new Date(a.stock).getMonth());
      });
    });
  }

  getBuysProducts() {
    this.buyProductsService.getAllBuyProducts().subscribe(
      data => {
      data.map((item) => {
        this.movement = {
          description: item.product_id.description,
          code: item.product_id.code,
          stock: item.buys_stock,
          date: item.buys_date,
          bill: item.buys_bill,
          totals_stock: item.product_id.totals_stock,
          category: 'entrada',
        };
        this.movements.push(this.movement);
        this.movements.sort((a,b)=>new Date(b.stock).getMonth()-new Date(a.stock).getMonth());
      });
    });
  }
}
