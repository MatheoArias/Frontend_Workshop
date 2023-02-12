import { Component,Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product, UpdateProductsDTO } from 'src/app/models/product.model';
import { BuyProducts,UpdateBuysProductDTO,createBuysProductDTO } from 'src/app/models/buy_product.model';
import { BuyProductsService } from 'src/app/services/buy-products.service';
import { ProductService } from 'src/app/services/product.service';
import {switchMap} from 'rxjs/operators'
import {zip} from 'rxjs'
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-buys-products',
  templateUrl: './buys-products.component.html',
  styleUrls: ['./buys-products.component.scss']
})
export class BuysProductsComponent {

  formBuysProduct!:FormGroup;
  value: any | null=0;

  @Input() buysProducts:BuyProducts[]=[];
  @Input() products:Product[] = [];

  product:UpdateProductsDTO = {
    id: 0,
    category_id: 0,
    code: '',
    description: '',
    buys_stock:0,
    unit_value:0,
    totals_stock: 0,
  };

  buysProduct:BuyProducts={
    id:0,
    product_id:{
      id: 0,
      category_id: {
        id:0,
        category: '',
      },
      code: '',
      description: '',
      buys_stock:0,
      unit_value:0,
      totals_stock: 0,
    },
    buys_date:new Date(),
    buys_bill: '',
    buys_stock:0,
    buys_unit_value:0,
  }


  selectedBuyProduct!:BuyProducts;
  messagges:string='';
  statusCode: number=0;
  statusDeatil:'Loading' | 'Success' | 'Error'| 'Init' = 'Init'

  displayedColumns: string[] = ['productId', 'buysDate', 'buysBill','buysStock','totalsStock','buysUnitValue','totalBuysValue','toggleUpdate','toggleDelete'];
  dataSource = this.buysProducts;

  get productId() {
    return this.formBuysProduct.get('product_id');
  }
  get buysDate() {
    return this.formBuysProduct.get('buys_date');
  }
  get buysBill() {
    return this.formBuysProduct.get('buys_bill');
  }
  get buysStock() {
    return this.formBuysProduct.get('buys_stock');
  }
  get buysUnitValue() {
    return this.formBuysProduct.get('buys_unit_value');
  }

  private formAddBuysProduct() {
    this.formBuysProduct = this.formBuilder.group({
      product_id: ['', [Validators.required]],
      buys_date: ['', [Validators.required]],
      buys_bill: ['', [Validators.required]],
      buys_stock: ['', [Validators.required]],
      buys_unit_value: ['', [Validators.required]],
    });
  }
  constructor(
    private formBuilder: FormBuilder,
    private productService:ProductService,
    private buyProductsService:BuyProductsService
  ) {
    this.formAddBuysProduct();
  }

  getBuysTotalValue(){
    this.value=this.buysStock?.value*this.buysUnitValue?.value
  }

  getAllBuyProducts(){
    this.buyProductsService.getAllBuyProducts()
    .subscribe(data=>{
      this.buysProducts=data
    })
  }

  submit(event: Event) {
    const addBuyProduct:createBuysProductDTO = this.formBuysProduct.value;
    if (this.formBuysProduct.valid) {
      zip(
        this.productService.getProduct(addBuyProduct.product_id),
        this.buyProductsService.createBuyProduct(addBuyProduct)
      )
      .subscribe(response=>{
          const product=response[0]
          this.product.id = product.id
          this.product.category_id = product.category_id.id
          this.product.code = product.code
          this.product.description = product.description
          this.product.unit_value=product.unit_value
          this.product.buys_stock=product.buys_stock
          this.product.totals_stock=product.totals_stock + addBuyProduct.buys_stock
          this.productService.updateProduct(product.id,this.product).subscribe()
          this.getAllBuyProducts()
        }
      )
      this.getAllBuyProducts();
      this.formBuysProduct.reset();
    } else {
      this.formBuysProduct.markAllAsTouched();
    }
  }

  toggleDelete(item:BuyProducts) {
    this.productService.getProduct(item.product_id.id).subscribe(
      data=>{
        this.product.id = data.id
        this.product.category_id = data.category_id.id
        this.product.code = data.code
        this.product.description = data.description
        this.product.unit_value=data.unit_value
        this.product.buys_stock=data.buys_stock
        this.product.totals_stock=data.totals_stock - item.buys_stock
        this.productService.updateProduct(data.id,this.product).subscribe()
      }
    )
    this.buyProductsService.deleteBuyProduct(item.id).subscribe(
      data=>{
        this.getAllBuyProducts()
      }
    );
  }

  updateBuyProducts(){
    const addBuyProduct:UpdateBuysProductDTO=this.formBuysProduct.value
    if (this.formBuysProduct.valid) {
      this.buyProductsService.getBuyProduct(this.selectedBuyProduct.id).subscribe(
        data=>{
        this.productService.getProduct(data.product_id.id).subscribe(
          data=>{
            this.product.id = data.id
            this.product.category_id = data.category_id.id
            this.product.code = data.code
            this.product.description = data.description
            this.product.unit_value=data.unit_value
            this.product.buys_stock=addBuyProduct.buys_stock
            this.product.totals_stock=(data.totals_stock)-this.selectedBuyProduct.buys_stock
            this.productService.updateProduct(data.id,this.product).subscribe()
            this.getAllBuyProducts()
          }
        )
      }
      )
      this.buyProductsService.updateBuyProduct(this.selectedBuyProduct.id,addBuyProduct).subscribe()
      this.formBuysProduct.reset();
    } else {
      this.formBuysProduct.markAllAsTouched();
    }
  }

  toggleUpdates(item:BuyProducts) {
    this.statusDeatil='Loading';
    this.buyProductsService.getBuyProduct(item.id).subscribe(
      data=>{
        this.formBuysProduct.patchValue(data);
        this.productId?.setValue(data.product_id.id);
        this.selectedBuyProduct = data
        this.statusDeatil='Success';
      },error=>{
        window.alert(error);
        this.statusDeatil='Error';
      }
    )
  }

  test(buysProduct:BuyProducts){
    console.log(buysProduct)
  }

}
