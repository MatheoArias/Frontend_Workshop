import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSellProductComponent } from './update-sell-product.component';

describe('UpdateSellProductComponent', () => {
  let component: UpdateSellProductComponent;
  let fixture: ComponentFixture<UpdateSellProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSellProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSellProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
