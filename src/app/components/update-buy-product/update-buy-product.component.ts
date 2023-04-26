import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, Form} from '@angular/forms';
import { BuyProducts,UpdateBuysProductDTO} from 'src/app/models/buy_product.model';
import { Product} from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { BuyProductsService } from 'src/app/services/buy-products.service';
import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-buy-product',
  templateUrl: './update-buy-product.component.html',
  styleUrls: ['./update-buy-product.component.scss']
})
export class UpdateBuyProductComponent implements OnInit {

  products:Product[]=[];
  product:Product={
    id: 0,
    category_id: {
        id: 0,
        category: ''
    },
    code: '',
    description: '',
    unit_value: 0,
    percentage: 0,
    totals_stock: 0
  }

  buyProducts:BuyProducts[]=[];
  buyProduct:BuyProducts={
    id: 0,
    product_id: this.product,
    buys_date: new Date(),
    buys_bill: "",
    buys_stock: 0,
    buys_unit_value:0
  }
  buyProductDTO:UpdateBuysProductDTO={
    id:0,
    product_id: 0,
    buys_date: new Date(),
    buys_bill: "",
    buys_stock: 0,
    buys_unit_value:0
  }

  filterpipe = new FilterPipe();
  itemFind: string = "";
  valueFind = new FormControl('');
  listFilter:BuyProducts[] = [];
  choiceProduct=new FormControl('')

  messagges: string = '';
  statusCode: number = 0;
  statusDeatil: 'Loading' | 'Success' | 'Error' | 'Init' = 'Init';


  //This is the sell product form
  get buysBill() {
    return this.formBuysProduct.get('buys_bill');
  }
  get buysStock() {
    return this.formBuysProduct.get('buys_stock');
  }
  get buysUnitValue() {
    return this.formBuysProduct.get('buys_unit_value');
  }
  formBuysProduct!: FormGroup;
  private formAddBuysProduct() {
    this.formBuysProduct = this.formBuilder.group({
      buys_bill: ['', [Validators.required]],
      buys_stock:['', [Validators.required]],
      buys_unit_value:['', [Validators.required]],
    });
  }

  constructor(
    private formBuilder:FormBuilder,
    private productService:ProductService,
    private buyProductService:BuyProductsService
  ){
    this.formAddBuysProduct();
  }

  ngOnInit(){
    this.getAllBuyProducts();
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts()
      .subscribe(data=>{
        this.products=data;
      })
  }

  getAllBuyProducts(){
    this.buyProductService.getAllBuyProducts()
      .subscribe(data=>{
        this.buyProducts=data;
        this.listFilter=data;
      })
  }

  onClickListProducts(item:BuyProducts){
    this.buyProduct=item
    this.buyProductService.getBuyProduct(item.id)
      .subscribe(data=>{
        this.formBuysProduct.patchValue(data);
      })
    console.log(this.buyProduct.product_id.totals_stock)
  }

  //this function is for update sell products, in this case, I'm substract the actually value and  I'm add the new value
  submit(event:Event){
    event.preventDefault()
    if(this.formBuysProduct.valid){
      this.buyProductDTO = {
        id: this.buyProduct.id,
        product_id: this.buyProduct.product_id.id,
        buys_date: this.buyProduct.buys_date,
        buys_bill: this.buysBill?.value,
        buys_stock: this.buysStock?.value,
        buys_unit_value: this.buysUnitValue?.value
      }
      zip(
        this.productService.getProduct(this.buyProductDTO.product_id),
        this.buyProductService.updateBuyProduct(this.buyProductDTO.id,this.buyProductDTO)
      )
      .pipe(
        switchMap((product) =>
          this.productService.updateTotalStockProduct(product[0].id,
            {
              totals_stock: (product[0].totals_stock - this.buyProduct.buys_stock) + this.buyProductDTO.buys_stock,
              unit_value: this.buyProductDTO.buys_unit_value
            }
          )
        )
      ).subscribe(data=>{
        Swal.fire({
          icon: 'success',
          confirmButtonText: 'Regresar',
          title: 'Producto modificado con éxito',
          html: `El producto: <strong>${this.buyProduct.product_id.description}</strong> con facftura: <strong>${this.buyProduct.buys_bill}</strong>  del <strong>${this.buyProduct.buys_date}</strong> fue modificado con éxito`,
        })
        this.getAllBuyProducts();
        this.getAllProducts();
        this.choiceProduct.reset();
        this.formBuysProduct.reset();
        this.product={
          id: 0,
          category_id: {
              id: 0,
              category: ''
          },
          code: '',
          description: '',
          unit_value: 0,
          percentage: 0,
          totals_stock: 0
        }
        this.buyProduct={
          id: 0,
          product_id: this.product,
          buys_date: new Date(),
          buys_bill: "",
          buys_stock: 0,
          buys_unit_value:0
        }
      })
    }
  }

  //this function is for delete sell products, in this case, I'm substract the buy stock of total stock
  toggleDelete(item:BuyProducts){
    this.statusDeatil='Loading'
    zip(
      this.productService.getProduct(item.product_id.id),
      this.buyProductService.deleteBuyProduct(item.id),
    )
    .pipe(
      switchMap((product)=>
        this.productService.updateTotalStockProduct(product[0].id, {
        totals_stock: product[0].totals_stock - this.buyProduct.buys_stock,
        unit_value: product[0].unit_value
      }))
    ).subscribe(data=>{
      this.getAllBuyProducts();
      this.statusDeatil='Success'
      Swal.fire({
        icon: 'success',
        confirmButtonText: 'Regresar',
        title: 'Producto eliminado con éxito',
        html: `El producto <strong>${item.product_id.description}</strong> con factura <strong>${item.buys_bill}</strong> del <strong>${item.buys_date}</strong> fue eliminado con éxito`,
      })
      this.choiceProduct.reset();
      this.formBuysProduct.reset();
    })
  }

  //this function is for find products in the list call from api
    onChangeText(){
      if(this.valueFind.value){
        this.itemFind=this.valueFind.value;
        this.listFilter=this.filterpipe.transform(this.products,this.itemFind);
        this.product={
          id: 0,
          category_id: {
              id: 0,
              category: ''
          },
          code: '',
          description: '',
          unit_value: 0,
          percentage: 0,
          totals_stock: 0
        }
        this.buyProduct={
          id: 0,
          product_id: this.product,
          buys_date: new Date(),
          buys_bill: "",
          buys_stock: 0,
          buys_unit_value:0
        }
        this.choiceProduct.reset();
        this.formBuysProduct.reset();
      }else{
        this.itemFind="";
      }
    }
}
