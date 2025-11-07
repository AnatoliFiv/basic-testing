// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 322, b: 228, action: Action.Add };
    const result = simpleCalculator(input);

    expect(result).toBe(550);
  });

  test('should subtract two numbers', () => {
    const input = { a: 10, b: 4, action: Action.Subtract };
    const result = simpleCalculator(input);

    expect(result).toBe(6);
  });

  test('should multiply two numbers', () => {
    const input = { a: 12, b: 3, action: Action.Multiply };
    const result = simpleCalculator(input);

    expect(result).toBe(36);
  });

  test('should divide two numbers', () => {
    const input = { a: 30, b: 2, action: Action.Divide };
    const result = simpleCalculator(input);

    expect(result).toBe(15);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 12, b: 2, action: Action.Exponentiate };
    const result = simpleCalculator(input);

    expect(result).toBe(144);
  });

  test('should return null for invalid action', () => {
    const input = { a: 11, b: 11, action: 'wrong action :)' };
    const result = simpleCalculator(input);

    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = { a: '32', b: '', action: Action.Add };
    const result = simpleCalculator(input);

    expect(result).toBeNull();
  });
});
