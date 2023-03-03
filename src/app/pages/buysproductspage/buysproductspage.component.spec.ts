import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuysproductspageComponent } from './buysproductspage.component';

describe('BuysproductspageComponent', () => {
  let component: BuysproductspageComponent;
  let fixture: ComponentFixture<BuysproductspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuysproductspageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuysproductspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
