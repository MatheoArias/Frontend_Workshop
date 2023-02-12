import { TestBed } from '@angular/core/testing';

import { SellProductsService } from './sell-products.service';

describe('SellProductsService', () => {
  let service: SellProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
