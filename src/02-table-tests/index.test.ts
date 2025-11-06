// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 4, action: Action.Subtract, expected: 6 },
  { a: 12, b: 3, action: Action.Multiply, expected: 36 },
  { a: 30, b: 2, action: Action.Divide, expected: 15 },
  { a: 12, b: 2, action: Action.Exponentiate, expected: 144 },
  { a: 11, b: 11, action: 'wrong action :)', expected: null },
  { a: '32', b: '', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should $action $a and $b to get $expected',
    ({ a, b, action, expected }) => {
      const input = { a, b, action };
      const result = simpleCalculator(input);
      expect(result).toBe(expected);
    },
  );
});
