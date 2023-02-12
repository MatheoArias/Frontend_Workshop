import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { SellProducts,UpdateSellProductsDTO,CreateSellProductsDTO } from 'src/app/models/sell_product.model';
import { SellProductsService } from 'src/app/services/sell-products.service';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sell-products',
  templateUrl: './sell-products.component.html',
  styleUrls: ['./sell-products.component.scss']
})
export class SellProductsComponent implements OnInit  {

  formSellsProduct!:FormGroup;
  sellsProducts:SellProducts[]=[];
  products:Product[]=[];
  messagges:string="";
  selectedSelldProductId:number=0;

  displayedColumns: string[] = ['productId', 'sellsDate', 'sellsBill','sellsStock','totalsStock','UnitValue','totalSellsValue','toggleUpdate','toggleDelete'];
  dataSource = this.sellsProducts;

  get productId() {
    return this.formSellsProduct.get('product_id');
  }
  get sellDate() {
    return this.formSellsProduct.get('sell_date');
  }
  get sellBill() {
    return this.formSellsProduct.get('sell_bill');
  }
  get sellStock(){
    return this.formSellsProduct.get('sell_stock');
  }
  get totalSellValue() {
    return this.formSellsProduct.get('total_sell_value');
  }
  private formAddSellsProduct() {
    this.formSellsProduct = this.formBuilder.group({
      product_id: ['', [Validators.required]],
      sell_date: ['', [Validators.required]],
      sell_bill: ['', [Validators.required]],
      sell_stock: ['', [Validators.required]],
      total_sell_value: ['', [Validators.required]],
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private sellProductsService:SellProductsService,
    private productService:ProductService,
  ){
    this.formAddSellsProduct()
  }

  ngOnInit(): void {
    this.getAllSellProducts();
    this.getAllProducts();
  }

  getAllSellProducts(){
    this.sellProductsService.getAllSellProducts().subscribe(
      data=>{
        this.sellsProducts = data;
      }
    )
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(
      data=>{
        this.products = data;
      }
    )
  }

  submit(event:Event){
    event.preventDefault();
    const addSellsProduct:CreateSellProductsDTO=this.formSellsProduct.value
    if(this.formSellsProduct.valid){
      this.sellProductsService.createSellProducts(addSellsProduct).subscribe(
        data=>{
          this.getAllSellProducts();
          this.messagges=`El producto ${data.product_id.description} con código ${data.product_id.code} fue agregado con éxito `;
        }
      );
      this.formSellsProduct.reset();
    }else{
      this.formSellsProduct.markAllAsTouched();
    }
  }


  updateSellProduct(){
    const addSellsProduct:UpdateSellProductsDTO=this.formSellsProduct.value
    if (this.formSellsProduct.valid) {
      this.sellProductsService.updateSellProducts(this.selectedSelldProductId,addSellsProduct).subscribe(
        data=>{
          this.getAllSellProducts();
          this.messagges=`El producto ${data.product_id.id} con código ${data.product_id.code} fue modificado con éxito `;
        }
      )
      this.formSellsProduct.reset();
    } else {
      this.formSellsProduct.markAllAsTouched();
    }
  }

  toggleUpdate(item: Product){
    this.sellProductsService.getSellProducts(item.id).subscribe(
      data=>{
        this.formSellsProduct.patchValue(data);
        this.productId?.setValue(data.product_id.id);
        this.selectedSelldProductId = data.id
      }
    )
  }

  toggleDelete(item: Product){
    this.sellProductsService.deleteSellProducts(item.id).subscribe(
      data=>{
        this.getAllSellProducts();
      }
    )
  }
}
