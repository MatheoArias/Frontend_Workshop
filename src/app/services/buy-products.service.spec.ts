import { TestBed } from '@angular/core/testing';

import { BuyProductsService } from './buy-products.service';

describe('BuyProductsService', () => {
  let service: BuyProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
