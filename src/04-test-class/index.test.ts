// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 1000;
  test('should create account with initial balance', () => {
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balanceWithGap = initialBalance + 100;
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(balanceWithGap)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(initialBalance);
    const account2 = getBankAccount(initialBalance);
    const amountToTransfer = initialBalance + 100;
    expect(() => account1.transfer(amountToTransfer, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(initialBalance);
    expect(() => account.transfer(initialBalance, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const amountToDeposit = 2000;
    const account = getBankAccount(initialBalance);
    account.deposit(amountToDeposit);
    expect(account.getBalance()).toBe(initialBalance + amountToDeposit);
  });

  test('should withdraw money', () => {
    const amountToWithdraw = 500;
    const account = getBankAccount(initialBalance);
    account.withdraw(amountToWithdraw);
    expect(account.getBalance()).toBe(initialBalance - amountToWithdraw);
  });

  test('should transfer money', () => {
    const amountToTransfer = 500;
    const account = getBankAccount(initialBalance);
    const accountToTransfer = getBankAccount(initialBalance);
    account.transfer(amountToTransfer, accountToTransfer);
    expect(account.getBalance()).toBe(initialBalance - amountToTransfer);
    expect(accountToTransfer.getBalance()).toBe(
      initialBalance + amountToTransfer,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(initialBalance);
    const mockBalance = 100;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(mockBalance);
    await expect(account.fetchBalance()).resolves.toEqual(mockBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(initialBalance);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(100);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(initialBalance);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
