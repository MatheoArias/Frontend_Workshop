import { Component, OnInit } from '@angular/core';
import { BuyProducts,UpdateBuysProductDTO,createBuysProductDTO } from 'src/app/models/buy_product.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product, UpdateProductsDTO } from 'src/app/models/product.model';
import { BuyProductsService } from 'src/app/services/buy-products.service';

@Component({
  selector: 'app-buys-products',
  templateUrl: './buys-products.component.html',
  styleUrls: ['./buys-products.component.scss']
})
export class BuysProductsComponent implements OnInit  {

  formBuysProduct!:FormGroup;
  buysProducts:BuyProducts[]=[];
  products:Product[] = [];
  product:UpdateProductsDTO = {
    id: 0,
    category_id: 0,
    code: '',
    description: '',
    buys_stock:0,
    unit_value:0,
    totals_stock: 0,
  };

  selectedBuyProduct!:BuyProducts;
  messagges:string='';
  statusCode: number=0;

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
  get totalBuysValue() {
    return this.formBuysProduct.get('total_buys_value');
  }

  private formAddBuysProduct() {
    this.formBuysProduct = this.formBuilder.group({
      product_id: ['', [Validators.required]],
      buys_date: ['', [Validators.required]],
      buys_bill: ['', [Validators.required]],
      buys_stock: ['', [Validators.required]],
      buys_unit_value: ['', [Validators.required]],
      total_buys_value: ['', [Validators.required]],
    });
  }
  constructor(
    private formBuilder: FormBuilder,
    private productService:ProductService,
    private buyProductsService:BuyProductsService
  ) {
    this.formAddBuysProduct();
  }

  ngOnInit():void{
    this.getAllProducts();
    this.getAllBuyProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(
      data=>{
        this.products = data;
      }
    );
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
      this.productService.getProduct(addBuyProduct.product_id).subscribe(
        data=>{
          this.product.id = data.id
          this.product.category_id = data.category_id.id
          this.product.code = data.code
          this.product.description = data.description
          this.product.unit_value=data.unit_value
          this.product.buys_stock=data.buys_stock
          this.product.totals_stock=data.totals_stock + addBuyProduct.buys_stock
          this.productService.updateProduct(data.id,this.product).subscribe()
          this.buyProductsService.getAllBuyProducts().subscribe()
        }
      )
      this.buyProductsService.createBuyProduct(addBuyProduct).subscribe(data=>{
        this.getAllBuyProducts();
      })
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
            this.product.totals_stock=(data.totals_stock + addBuyProduct.buys_stock)-this.selectedBuyProduct.buys_stock
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
    this.buyProductsService.getBuyProduct(item.id).subscribe(
      data=>{
        this.formBuysProduct.patchValue(data);
        this.productId?.setValue(data.product_id.id);
        this.selectedBuyProduct = data
      }
    )
  }

}


