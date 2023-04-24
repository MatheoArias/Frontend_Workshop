import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { SellProducts, CreateSellProductsDTO } from 'src/app/models/sell_product.model';
import { Product } from 'src/app/models/product.model';
import { Discounts } from 'src/app/models/discount.model';

import { ProductService } from 'src/app/services/product.service';
import { SellProductsService } from 'src/app/services/sell-products.service';
import { DiscountService } from 'src/app/services/discount.service';

import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { CurrencyPercentPipe } from 'src/app/pipes/currency-percent.pipe';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';

@Component({
  selector: 'app-update-sell-product',
  templateUrl: './update-sell-product.component.html',
  styleUrls: ['./update-sell-product.component.scss']
})

export class UpdateSellProductComponent implements OnInit {

  products: Product[] = [];
  sellProducts: SellProducts[] = [];
  discounts: Discounts[] = []
  listFilter: SellProducts[] = [];
  itemFind: string = "";

  product:Product={
    id: 0,
    category_id: {
      id:0,
      category: '',
    },
    code: '',
    description: '',
    unit_value:0,
    totals_stock: 0,
    percentage:0,
  }

  discount:Discounts={
    id: 0,
    types: '',
    description: '',
    percentage: 0,
  }

  sellProduct:SellProducts={
    id:0,
    product_id: this.product,
    sell_date:new Date(),
    sell_bill:'',
    sell_stock:0,
    total_sell_value:0,
    discount_id: this.discount,
    discount_value: 0,
  }

  formSellProduct!: FormGroup;
  get sellBill() {
    return this.formSellProduct.get('sell_bill');
  }
  get sellStock() {
    return this.formSellProduct.get('sell_stock');
  }
  get inputdiscount() {
    return this.formSellProduct.get('discount_id');
  }
  private formAddSellProduct() {
    this.formSellProduct = this.formBuilder.group({
      sell_bill: [, [Validators.required]],
      sell_stock: [, [Validators.required]],
      discount_id: ['', [Validators.required]],
    })
  }

  valueFind = new FormControl('');
  choiceProduct = new FormControl();

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private sellProductsService: SellProductsService,
    private discountService: DiscountService,
  ) {
    this.formAddSellProduct();
  }

  ngOnInit() {
    this.getAllProducts();
    this.getAllSellProducts();
    this.getAllDiscounts();
  }

  //this is for get all sell products
  getAllSellProducts() {
    this.sellProductsService.getAllSellProducts()
      .subscribe(data => {
        this.sellProducts = data;
        this.listFilter = data;
      })
    console.log(this.sellProducts)
  }

  //this is for get all products
  getAllProducts() {
    this.productService.getAllProducts()
      .subscribe(data => {
        this.products = data;
      })
  }

  getAllDiscounts() {
    this.discountService.getAllDiscounts()
      .subscribe(data => {
        this.discounts = data;
      })
  }

  onClickListProducts(item:SellProducts){
    this.sellProduct=item;
    this.sellProductsService.getSellProducts(item.id)
    .subscribe(data=>{
      this.formSellProduct.patchValue(data);
      if(data.discount_id){
        this.inputdiscount?.setValue(data.discount_id);
      }
      else{
        this.inputdiscount?.setValue(0);
      }
    })
  }
}
