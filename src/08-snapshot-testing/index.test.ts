// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const elements = [1, 2];
    const expected = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: null,
          next: null,
        },
      },
    };
    const result = generateLinkedList(elements);
    expect(result).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const elements = [2, 3, 4, 5];
    expect(generateLinkedList(elements)).toMatchSnapshot();
  });
});
