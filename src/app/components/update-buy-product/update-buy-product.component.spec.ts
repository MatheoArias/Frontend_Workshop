import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBuyProductComponent } from './update-buy-product.component';

describe('UpdateBuyProductComponent', () => {
  let component: UpdateBuyProductComponent;
  let fixture: ComponentFixture<UpdateBuyProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBuyProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBuyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
