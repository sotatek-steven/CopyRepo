import { ethers } from 'ethers';
import getRpcUrl from './getRpcUrl';

const RPC_URLs = getRpcUrl();

export const binanceRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URLs['binance']);
