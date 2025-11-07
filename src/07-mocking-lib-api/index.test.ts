// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');
  return {
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

const mockedAxiosCreate = axios.create as jest.Mock;

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockInstance = { get: jest.fn().mockResolvedValue({ data: {} }) };
    mockedAxiosCreate.mockReturnValue(mockInstance);
    await throttledGetDataFromApi('/test');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockInstance = { get: jest.fn().mockResolvedValue({ data: {} }) };
    mockedAxiosCreate.mockReturnValue(mockInstance);
    const relativePath = '/test/1';
    await throttledGetDataFromApi(relativePath);
    expect(mockInstance.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockData = { id: 1, name: 'Test' };
    const mockInstance = {
      get: jest.fn().mockResolvedValue({ data: mockData }),
    };
    mockedAxiosCreate.mockReturnValue(mockInstance);
    const result = await throttledGetDataFromApi('/test/1');
    expect(result).toEqual(mockData);
  });
});
