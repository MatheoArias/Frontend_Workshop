import { Component, Input, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Discounts, CreateDiscountDTO } from 'src/app/models/discount.model';
import { DiscountService } from 'src/app/services/discount.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})

export class DiscountsComponent {

  @Output() modalStateDiscountEvent= new EventEmitter<boolean>();
  modalStateDiscount=true

  @Input() discounts: Discounts[] = [];
  discount: Discounts = {
    id: 0,
    types: '',
    description: '',
    percentage: 0,
  }

  statusCode= 0;
  statusDeatil: 'Loading' | 'Success' | 'Error' | 'Init' = 'Init';

  //this is the producst form
  formDiscount!: FormGroup;

  get types() {
    return this.formDiscount.get('types');
  }
  get description() {
    return this.formDiscount.get('description');
  }
  get percentage() {
    return this.formDiscount.get('percentage');
  }
  private formAddDiscount() {
    this.formDiscount = this.formBuilder.group({
      types: ['', [Validators.required]],
      description: ['', [Validators.required]],
      percentage: ['', [Validators.required]],
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private discountService: DiscountService
  ) {
    this.formAddDiscount();
  }

  //This function is for get all discounts
  getAllDicusounts() {
    this.discountService.getAllDiscounts()
      .subscribe(data => {
        this.discounts = data;
      })
  }

  //this function is for send modal State to products component
  sendModalStateDiscount(){
    this.modalStateDiscount = false;
    this.modalStateDiscountEvent.emit(this.modalStateDiscount);
    this.discount= {
      id: 0,
      types: '',
      description: '',
      percentage: 0,
    }
  }

  // this function is for add discount to data base
  submit(event: Event) {
    event.preventDefault();
    this.statusDeatil = 'Loading'
    const addDiscount: CreateDiscountDTO = {
      types: this.types?.value,
      description: this.description?.value,
      percentage: this.percentage?.value / 100,
    };
    if (this.formDiscount.valid) {
      this.discountService.createDiscounts(addDiscount)
        .subscribe(() => {
          this.getAllDicusounts();
        })
      Swal.fire({
        icon: 'success',
        confirmButtonText: 'Regresar',
        title: 'Descuento agregado con éxito',
        html: `El descuento <strong>${this.discount.types}</strong> por <strong>${this.discount.percentage}</strong>  % fue agregado con éxito`,
      })
      this.statusDeatil = 'Success'
      this.formDiscount.reset();
      this.discount = {
        id: 0,
        types: '',
        description: '',
        percentage: 0,
      }
    } else {
      Swal.fire({
        icon: 'error',
        confirmButtonText: 'Regresar',
        title: 'Error en el formulario',
        html: `El formulario no fue diligenciado correctamente, regrese y revise cada uno de los campos`,
      })
      this.formDiscount.markAllAsTouched()
      this.statusDeatil = 'Error'
    }
  }

  //this function is for update discount in data base
  updateDiscount(event: Event) {
    this.statusDeatil = 'Loading'
    event.preventDefault();
    const addDiscount: Discounts = {
      id:this.discount.id,
      types: this.types?.value,
      description: this.description?.value,
      percentage: this.percentage?.value / 100,
    }
    if (this.formDiscount.valid) {
      this.discountService.updateDiscounts(this.discount.id, addDiscount)
        .subscribe(() => {
          this.getAllDicusounts();
        })
      Swal.fire({
        icon: 'success',
        confirmButtonText: 'Regresar',
        title: 'Descuento modificado con éxito',
        html: `El descuento <strong>${this.discount.types} </strong> por <strong>${addDiscount.percentage*100}</strong> % fue modificado con éxito`,
      })
      this.statusDeatil = 'Success'
      this.formDiscount.reset();
      this.discount = {
        id: 0,
        types: '',
        description: '',
        percentage: 0,
      }
    } else {
      Swal.fire({
        icon: 'error',
        confirmButtonText: 'Regresar',
        title: 'Error en el formulario',
        html: `El formulario no fue diligenciado correctamente, regrese y revise cada uno de los campos`,
      })
      this.formDiscount.markAllAsTouched()
      this.statusDeatil = 'Error'
    }
  }

  //this function is for add item to form discount
  toggleUpdate(item: Discounts) {
    this.discountService.getDiscounts(item.id)
      .subscribe(data => {
        this.discount = {
          id: data.id,
          types: data.types,
          description: data.description,
          percentage: data.percentage * 100,
        };
        this.formDiscount.patchValue(this.discount);
      })

  }

  //this function is for delete discount of data base
  toggleDelete(item: Discounts) {
    this.discountService.deleteDiscounts(item.id)
      .subscribe(() => {
        this.getAllDicusounts();
      })
    Swal.fire({
      icon: 'success',
      confirmButtonText: 'Regresar',
      title: 'Descuento eliminado',
      html: `El descuento fue eliminado con éxito`,
    })
    this.statusDeatil = 'Success'
    this.formDiscount.reset();
    this.discount = {
      id: 0,
      types: '',
      description: '',
      percentage: 0,
    }
  }
}
