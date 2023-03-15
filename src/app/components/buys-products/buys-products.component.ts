import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Product} from 'src/app/models/product.model';
import {BuyProducts,UpdateBuysProductDTO,createBuysProductDTO,} from 'src/app/models/buy_product.model';
import { BuyProductsService } from 'src/app/services/buy-products.service';
import { ProductService } from 'src/app/services/product.service';
import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-buys-products',
  templateUrl: './buys-products.component.html',
  styleUrls: ['./buys-products.component.scss'],
})
export class BuysProductsComponent implements OnInit {
  formBuysProduct!: FormGroup;
  value: any | null = 0;

  buysProducts: BuyProducts[] = [];
  products: Product[] = [];
  radioState: number = 0;

  selectedBuyProduct!: BuyProducts;
  messagges: string = '';
  statusCode: number = 0;
  statusDeatil: 'Loading' | 'Success' | 'Error' | 'Init' = 'Init';

  buysProduct: BuyProducts = {
    id: 0,
    product_id: {
      id: 0,
      category_id: {
        id: 1,
        category: '',
      },
      code: '',
      description: '',
      unit_value: 0,
      totals_stock: 0,
    },
    buys_date: new Date(),
    buys_bill: '',
    buys_stock: 0,
    buys_unit_value: 0,
  };

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

  dateNow: Date = new Date();
  private formAddBuysProduct() {
    this.formBuysProduct = this.formBuilder.group({
      product_id: ['', [Validators.required]],
      buys_date: [new Date().toDateString(), [Validators.required]],
      buys_bill: ['', [Validators.required]],
      buys_stock: [0, [Validators.required]],
      buys_unit_value: [0, [Validators.required]],
    });
  }
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private buyProductsService: BuyProductsService
  ) {
    this.formAddBuysProduct();
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllBuyProducts();
  }

  getBuysTotalValue() {
    let unitsValue: null | any = this.buysUnitValue?.value;
    this.value = this.buysStock?.value * this.buysUnitValue?.value;
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  getAllBuyProducts() {
    this.buyProductsService.getAllBuyProducts().subscribe((data) => {
      this.buysProducts = data;
    });
  }

  submit(event: Event) {
    this.statusDeatil = 'Loading';
    const addBuyProduct: createBuysProductDTO = this.formBuysProduct.value;
    if (this.formBuysProduct.valid) {
      zip(
        this.buyProductsService.createBuyProduct(addBuyProduct),
        this.productService.getProduct(addBuyProduct.product_id)
      )
        .pipe(
          switchMap((item) =>
            this.productService.updateTotalStockProduct(item[1].id, {
              totals_stock: item[1].totals_stock + addBuyProduct.buys_stock,
            })
          )
        )
        .subscribe((data) => {
          this.getAllBuyProducts();
        });
      this.statusDeatil = 'Success';
      this.formBuysProduct.reset();
    } else {
      this.statusDeatil = 'Error';
      this.formBuysProduct.markAllAsTouched();
    }
  }

  toggleDelete(item: BuyProducts) {
    const deleteProduct = item;
    this.statusDeatil = 'Loading';
    if (item.id) {
      zip(
        this.productService.getProduct(item.product_id.id),
        this.buyProductsService.deleteBuyProduct(item.id)
      )
        .pipe(
          switchMap((item) =>
            this.productService.updateTotalStockProduct(item[0].id, {
              totals_stock: item[0].totals_stock - deleteProduct.buys_stock,
            })
          )
        )
        .subscribe((data) => {
          this.getAllBuyProducts();
        });
      this.statusDeatil = 'Success';
    } else {
      this.statusDeatil = 'Error';
    }
  }

  updateBuyProducts() {
    const addBuyProduct: UpdateBuysProductDTO = this.formBuysProduct.value;
    if (this.formBuysProduct.valid) {
      this.productService
        .getProduct(this.selectedBuyProduct.product_id.id)
        .pipe(
          switchMap((item) =>
            this.productService.updateTotalStockProduct(item.id, {
              totals_stock:
                item.totals_stock -
                this.selectedBuyProduct.buys_stock +
                addBuyProduct.buys_stock,
            })
          ),
          switchMap(() =>
            this.buyProductsService.updateBuyProduct(
              this.selectedBuyProduct.id,
              addBuyProduct
            )
          )
        )
        .subscribe((data) => {
          this.getAllBuyProducts();
        });
      this.formBuysProduct.reset();
    } else {
      this.formBuysProduct.markAllAsTouched();
    }
  }

  toggleUpdates(item: BuyProducts) {
    this.radioState = item.id;
    this.value = item.buys_unit_value * item.buys_stock;
    this.statusDeatil = 'Loading';
    this.buyProductsService.getBuyProduct(item.id).subscribe(
      (data) => {
        this.formBuysProduct.patchValue(data);
        this.productId?.setValue(data.product_id.id);
        this.selectedBuyProduct = data;
        this.statusDeatil = 'Success';
      },
      (error) => {
        window.alert(error);
        this.statusDeatil = 'Error';
      }
    );
  }
}
