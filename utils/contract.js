/* eslint-disable no-useless-catch */
import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { ethers } from 'ethers';
import { fromBigNumberWithoutDecimal } from '@/utils/number';

export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

export function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export const approved = async (
  mainContract,
  useContract,
  maxLimit,
) => {
  let tx;
  try {
    const options = {};
    if (mainContract?.chain == 'polygon') {
      options.gasPrice = 40000000000;
    }
    tx = await mainContract.approve(useContract.address, maxLimit, options);
  } catch (error) {
    throw (error);
  }
  return tx.wait();
};

export async function approveForAll(contract, marketAddress) {
  let tx;
  const options = {};
  if (contract?.chain == 'polygon') {
    options.gasPrice = 40000000000;
  }
  try {
    tx = await contract.setApprovalForAll(marketAddress, true, options);
  } catch (error) {
    throw (error);
  }
  return tx.wait();
}

