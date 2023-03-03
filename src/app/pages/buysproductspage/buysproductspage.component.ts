import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { BuyProductsService } from 'src/app/services/buy-products.service';
import { Product } from 'src/app/models/product.model';
import { BuyProducts } from 'src/app/models/buy_product.model';
@Component({
  selector: 'app-buysproductspage',
  templateUrl: './buysproductspage.component.html',
})
export class BuysproductspageComponent implements OnInit {

  products:Product[] = [];
  buysProducts:BuyProducts[]=[]


  constructor(
    private productService: ProductService,
    private buyProductsService:BuyProductsService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllBuyProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(
      data=>{
        this.products = data
      }
    );
  }

  getAllBuyProducts(){
    this.buyProductsService.getAllBuyProducts()
    .subscribe(data=>{
      this.buysProducts=data
    })
  }
}
