import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { SellProducts } from 'src/app/models/sell_product.model';
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
import { UpdateSellProductsDTO } from 'src/app/models/sell_product.model';

@Component({
  selector: 'app-update-sell-product',
  templateUrl: './update-sell-product.component.html',
  styleUrls: ['./update-sell-product.component.scss']
})

export class UpdateSellProductComponent implements OnInit {

  //This is import the pipe CurrencyPercent
  CurrencyPercent = new CurrencyPercentPipe();
  //this is import the pipe filter
  filterpipe = new FilterPipe()
  listFilter: SellProducts[] = [];
  itemFind= "";

  statusCode = 0;
  statusDeatil: 'Loading' | 'Success' | 'Error' | 'Init' = 'Init';

  products: Product[] = [];
  product: Product = {
    id: 0,
    category_id: {
      id: 0,
      category: '',
    },
    code: '',
    description: '',
    unit_value: 0,
    totals_stock: 0,
    percentage: 0,
  }

  discounts: Discounts[] = []
  discount: Discounts = {
    id: 0,
    types: '',
    description: '',
    percentage: 0,
  }

  sellProducts: SellProducts[] = [];
  sellProduct: SellProducts = {
    id: 0,
    product_id: this.product,
    sell_date: new Date(),
    sell_bill: '',
    sell_stock: 0,
    discount_id: this.discount,
    total_sell_value: 0,
  }

  sellProductDTO: UpdateSellProductsDTO = {
    id: 0,
    product_id: 0,
    sell_date: new Date(),
    sell_bill: '',
    sell_stock: 0,
    discount_id: 0,
    total_sell_value: 0,
  }

  //This is the form to add Sell Products
  formSellProduct!: FormGroup;
  get sellBill() {
    return this.formSellProduct.get('sell_bill');
  }
  get sellStock() {
    return this.formSellProduct.get('sell_stock');
  }
  get inputDiscount() {
    return this.formSellProduct.get('discount_id');
  }
  private formAddSellProduct() {
    this.formSellProduct = this.formBuilder.group({
      sell_bill: ['', [Validators.required]],
      sell_stock: ['', [Validators.required]],
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

  }

  //this is for get all products
  getAllProducts() {
    this.productService.getAllProducts()
      .subscribe(data => {
        this.products = data;
      })
  }

  //this is for get all discounts
  getAllDiscounts() {
    this.discountService.getAllDiscounts()
      .subscribe(data => {
        this.discounts = data;
      })
  }

  //this is for add item to form sell products
  onClickListProducts(item: SellProducts) {
    this.sellProductsService.getSellProducts(item.id)
      .subscribe(data => {
        this.formSellProduct.patchValue(data);
        const totalUnitValueProduct = this.CurrencyPercent
          .transform((data.product_id.unit_value * data.product_id.percentage) + data.product_id.unit_value) * item.sell_stock
        if (data.discount_id) {
          this.inputDiscount?.setValue(data.discount_id.id);
          this.discount = data.discount_id
        }
        else {
          this.inputDiscount?.setValue(0);
          this.discount = {
            id: 0,
            types: '',
            description: '',
            percentage: 0,
          }
        }
        this.sellProduct = {
          id: data.id,
          product_id: data.product_id,
          sell_date: data.sell_date,
          sell_bill: data.sell_bill,
          sell_stock: data.sell_stock,
          discount_id: this.discount,
          total_sell_value: totalUnitValueProduct - (totalUnitValueProduct * this.discount.percentage),
        }
      })
  }

  //this function is for update sell products, in this case, I'm substract the actually value and  I'm add the new value
  submit(event: Event) {
    event.preventDefault()
    this.statusDeatil = 'Loading'
    const discount = this.discounts.find(item => item.id == this.inputDiscount?.value)
    const totalUnitValueProduct = this.CurrencyPercent
      .transform((this.sellProduct.product_id.unit_value * this.sellProduct.product_id.percentage) + this.sellProduct.product_id.unit_value) * this.sellStock?.value
    if (this.formSellProduct.valid) {
      this.sellProductDTO = {
        id: this.sellProduct.id,
        product_id: this.sellProduct.product_id.id,
        sell_date: this.sellProduct.sell_date,
        sell_bill: this.sellBill?.value,
        sell_stock: this.sellStock?.value,
        discount_id: discount ? discount.id : null,
        total_sell_value: discount ? totalUnitValueProduct - (totalUnitValueProduct * discount.percentage) : totalUnitValueProduct,
      }
      zip(
        this.productService.getProduct(this.sellProductDTO.product_id),
        this.sellProductsService.updateSellProducts(this.sellProductDTO.id, this.sellProductDTO)
      )
        .pipe(
          switchMap((product) =>
            this.productService.updateTotalStockProduct(product[0].id,
              {
                totals_stock: (product[0].totals_stock - this.sellProductDTO.sell_stock) + this.sellProduct.sell_stock,
                unit_value: product[0].unit_value
              }
            )
          )
        ).subscribe(() => {
          Swal.fire({
            icon: 'success',
            confirmButtonText: 'Regresar',
            title: 'Producto modificado con éxito',
            html: `El producto: <strong>${this.sellProduct.product_id.description}</strong> con factura: <strong>${this.sellProduct.sell_bill}</strong>  del <strong>${this.sellProduct.sell_date}</strong> fue modificado con éxito`,
          })
          this.getAllSellProducts();
          this.getAllProducts();
          this.choiceProduct.reset();
          this.formSellProduct.reset();
          this.product = {
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
          this.sellProduct = {
            id: 0,
            product_id: this.product,
            sell_date: new Date(),
            sell_bill: '',
            sell_stock: 0,
            discount_id: this.discount,
            total_sell_value: 0,
          }
          this.statusDeatil = 'Success'
        })
    }else{
      Swal.fire({
        icon: 'error',
        confirmButtonText: 'Regresar',
        title: 'Error en el formulario',
        html: `El formulario no fue diligenciado correctamente, Regrese y revise cada uno de los campos`,
      })
      this.formSellProduct.markAllAsTouched()
      this.statusDeatil='Error'
    }
  }


  //this function is for delete sell products, in this case, I'm substract the buy stock of total stock
  toggleDelete(item: SellProducts) {
    this.statusDeatil = 'Loading'
    zip(
      this.productService.getProduct(item.product_id.id),
      this.sellProductsService.deleteSellProducts(item.id),
    )
      .pipe(
        switchMap((product) =>
          this.productService.updateTotalStockProduct(product[0].id, {
            totals_stock: product[0].totals_stock + item.sell_stock,
            unit_value: product[0].unit_value
          }))
      ).subscribe(() => {
        this.getAllSellProducts();
        this.statusDeatil = 'Success'
        Swal.fire({
          icon: 'success',
          confirmButtonText: 'Regresar',
          title: 'Producto eliminado con éxito',
          html: `El producto <strong>${item.product_id.description}</strong> con factura <strong>${item.sell_bill}</strong> del <strong>${item.sell_date}</strong> fue eliminado con éxito`,
        })
        this.choiceProduct.reset();
        this.formSellProduct.reset();
      })
  }

  onchangeTotalValue() {
    const discount = this.discounts
      .find(item => item.id == this.inputDiscount?.value)

    const totalUnitValueProduct = this.CurrencyPercent
      .transform((this.sellProduct.product_id.unit_value * this.sellProduct.product_id.percentage) + this.sellProduct.product_id.unit_value) * this.sellStock?.value

    this.sellProduct.total_sell_value = discount ? totalUnitValueProduct - (totalUnitValueProduct * discount.percentage) : totalUnitValueProduct
  }

  //this function is for find products in the list call from api
  onChangeText() {
    if (this.valueFind.value) {
      this.itemFind = this.valueFind.value;
      this.listFilter = this.filterpipe.transform(this.products, this.itemFind);

      this.discount= {
        id: 0,
        types: '',
        description: '',
        percentage: 0,
      }

      this.product = {
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

      this.sellProduct = {
        id: 0,
        product_id: this.product,
        sell_date: new Date(),
        sell_bill: '',
        sell_stock: 0,
        discount_id: this.discount,
        total_sell_value: 0,
      }

      this.choiceProduct.reset();
      this.formSellProduct.reset();

    } else {
      this.itemFind = "";
    }
  }
}
