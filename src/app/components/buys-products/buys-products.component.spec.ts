import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuysProductsComponent } from './buys-products.component';

describe('BuysProductsComponent', () => {
  let component: BuysProductsComponent;
  let fixture: ComponentFixture<BuysProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuysProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuysProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
