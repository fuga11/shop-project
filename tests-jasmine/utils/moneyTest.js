import {centsToDollars} from '../../scripts/utils/money.js';

describe('test suite: FrormatCurrency',() => {
  it('convert cents into dollar',() => {
    expect(centsToDollars(2095)).toEqual('20.95');
  });
  it('work with 0',()=> {
    expect(centsToDollars(0)).toEqual('0.00');
  });
  it('rounds up to the nearest cent',() => {
    expect(centsToDollars(2000.6)).toEqual('20.01');
  });
});