import { BigNumber } from 'bignumber.js';

const DECIMAL = new BigNumber(10).pow(18);

export const fromBigNumber = (number, { numberFixed = 3 } = {}) => {
  const raw = (number || 0).toString();
  const value = new BigNumber(raw).div(DECIMAL);
  const weight = Math.pow(10, numberFixed);
  return Number(Math.round(value * weight) / weight).toLocaleString();
};

export const fromBigNumberWithoutDecimal = (number) => {
  const raw = number.toString() || 0;
  const value = new BigNumber(raw).div(DECIMAL).toString();
  return Number(value);
};

export const toBigNumber = (number) => {
  const amountString = DECIMAL.times(number)
    .toNumber()
    .toLocaleString('fullwide', { useGrouping: false });
  const value = new BigNumber(amountString)
    .toNumber()
    .toLocaleString('fullwide', { useGrouping: false });
  return value;
};
