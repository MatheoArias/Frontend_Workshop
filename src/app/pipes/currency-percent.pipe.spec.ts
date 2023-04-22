import { CurrencyPercentPipe } from './currency-percent.pipe';

describe('CurrencyPercentPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyPercentPipe();
    expect(pipe).toBeTruthy();
  });
});
