import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Product} from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';
import { BuyProducts } from 'src/app/models/buy_product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit  {

  products:Product[] = [];
  categories:Category[] = [];
  buysProducts:BuyProducts[]=[]
  modalState=false

  constructor(
    private productService: ProductService,
    private categoryService:CategoryService,
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  toggleModal(){
    this.modalState = !this.modalState;
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(
      data=>{
        this.products = data
      }
    );
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(
      data=>{
        this.categories = data;
      }
    )
  }
}
