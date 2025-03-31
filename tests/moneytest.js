import {centsToDollars} from '../../scripts/utils/money.js';

console.log('test suite: centsToDollars');

console.log('converts cents into dollars');

if (centsToDollars(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('works with 0');

if (centsToDollars(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('rounds up to the nearest cent');

if (centsToDollars(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}