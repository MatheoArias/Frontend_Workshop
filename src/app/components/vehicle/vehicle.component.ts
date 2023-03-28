import { Component,Input,OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Vehicles,UpdateVehiclesDTO, CreateVehiclesDTO } from 'src/app/models/vehicle.models';
import { Category } from 'src/app/models/category.model';
import { Customer } from 'src/app/models/customer.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import { CategoryService } from 'src/app/services/category.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})

export class VehicleComponent implements OnInit {

  vehicles:Vehicles[]=[];
  categories:Category[]=[];
  customers:Customer[]=[];
  vehicleId:number=0;
  valueFind=new FormControl('');
  itemFind:string="";
  filterpipe= new FilterPipe()
  listFilter:Vehicles[]=[];

  formVehicles!:FormGroup;

  get inputCategory(){
    return this.formVehicles.get('category');
  }

  get owner(){
    return this.formVehicles.get('owner');
  }
  get licensePlate(){
    return this.formVehicles.get('license_plate');
  }
  get trademark(){
    return this.formVehicles.get('trademark');
  }
  get model(){
    return this.formVehicles.get('model');
  }

  private formAddVehicle() {
    this.formVehicles = this.formBuilder.group({
      category: ['', [Validators.required]],
      owner: ['', [Validators.required]],
      license_plate: ['', [Validators.required,Validators.maxLength(6)]],
      trademark: ['', [Validators.required]],
      model: ['', [Validators.required]],
    });
  }

  constructor(
    private formBuilder:FormBuilder,
    private vehicleService:VehicleService,
    private categoryService:CategoryService,
    private customerService:CustomerService
  ){
    this.formAddVehicle();
  }

  ngOnInit() {
    this.getAllVehicles();
    this.getAllCategory();
    this.getAllCustomer();
  }

  getAllVehicles(){
    this.vehicleService.getAllVehicles()
    .subscribe(data=>{
      this.vehicles = data;
      this.listFilter=data;
    })
  }

  getAllCategory(){
    this.categoryService.getAllCategories()
    .subscribe(data=>{
      this.categories=data;
    })
  }

  getAllCustomer(){
    this.customerService.getAllCustomer()
    .subscribe(data=>{
      this.customers = data;
    })
  }

  submit(event:Event){
    event.preventDefault();
    const addVehicle:CreateVehiclesDTO=this.formVehicles.value
    if(this.formVehicles.valid){
      this.vehicleService.createVehicle(addVehicle)
      .subscribe(data=>{
        this.getAllVehicles();
      })
      this.formVehicles.reset();
    }else{
      this.formVehicles.markAllAsTouched();
    }
  }

  updateVehicle(){
    const updateVehicle:UpdateVehiclesDTO=this.formVehicles.value;
    if(this.formVehicles.valid){
      this.vehicleService.updateVehicle(this.vehicleId,updateVehicle)
      .subscribe(data=>{
        this.getAllVehicles();
      })
      this.formVehicles.reset();
    }
  }

  toggleUpdate(item:Vehicles){
    this.vehicleId=item.id;
    if(item.id){
      this.vehicleService.getVehicle(item.id)
      .subscribe(data=>{
        this.formVehicles.patchValue(data);
        this.inputCategory?.setValue(data.category.id);
        this.owner?.setValue(data.owner.id);
      })
    }
  }

  toggleDelete(item:Vehicles){
    this.vehicleService.deleteVehicle(item.id)
    .subscribe(data=>{
      this.getAllVehicles();
    })
  }

  onChangeText(){
    if(this.valueFind.value){
      this.itemFind=this.valueFind.value;
      this.listFilter=this.filterpipe.transform(this.vehicles,this.itemFind);
      this.vehicleId=0;
    }else{
      this.itemFind="";
    }
  }
}
