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

export async function signMessage(message, liblary) {
  let provider = liblary;
  if (!provider && window.ethereum) {
    await window.ethereum.send('eth_requestAccounts');
    provider = new ethers.providers.Web3Provider(window.ethereum);
  }
  if (!provider) {
    return null;
  }

  try {
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    return {
      message,
      signature,
      address,
    };
  } catch (err) {
    return null;
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

