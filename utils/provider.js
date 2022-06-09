import { ethers } from 'ethers';
import getRpcUrl from './getRpcUrl';

const RPC_URLs = getRpcUrl();

export const rpcProviders = Object.keys(RPC_URLs).reduce((map, key)=>{
  return map[key] = new ethers.providers.JsonRpcProvider(RPC_URLs[key]);
}, {});
