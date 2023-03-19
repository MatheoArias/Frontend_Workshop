import { TestBed } from '@angular/core/testing';

import { PaymentMediumService } from './payment-medium.service';

describe('PaymentMediumService', () => {
  let service: PaymentMediumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentMediumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
