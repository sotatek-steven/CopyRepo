import { useWeb3React } from '@web3-react/core';
import { useEffect, useMemo, useState } from 'react';
import { getContract } from '@/utils/contract';
import useWeb3BinanceProvider from './useWeb3BinanceProvider';
import useWeb3PolygonProvider from './useWeb3PolygonProvider';
import { abiConfigs, contractConfigs } from '@/config/constant/contractConfig';
import useWeb3Provider from './useWeb3Provider';
const chainConfigs = {
  56: 'binance',
  97: 'binance',
  80001: 'polygon',
}

function useContract({ abiMaps = {}, withSignerIfPossible = true, contractMaps = {}, name, defaultChain } = {}) {
  const { account, chainId } = useWeb3React();
  const { binanceLibrary } = useWeb3BinanceProvider();
  const { polygonLibrary } = useWeb3PolygonProvider();
  const [currentChain, setCurrentChain] = useState(chainConfigs[chainId] || defaultChain);
  const address = contractMaps[currentChain];
  const ABI = abiMaps[currentChain];
  useEffect(() => {
    setCurrentChain(chainConfigs[chainId]);
  }, [chainId]);

  return useMemo(() => {
    const currentLibrary = (currentChain == 'polygon' ? polygonLibrary : binanceLibrary);
    if (!address || !ABI || !currentLibrary) return null;
    try {
      // eslint-disable-next-line max-len
      const contract = getContract(address, ABI, currentLibrary, withSignerIfPossible && account ? account : undefined);
      return { ...contract, chain: currentChain };
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, polygonLibrary, binanceLibrary, withSignerIfPossible, account, currentChain]);
}

function useContractWithChain({ abiMaps = {}, withSignerIfPossible = true, contractMaps = {}, name, chain } = {}) {
  const { account } = useWeb3React();
  const { library } = useWeb3Provider(chain);
  const address = contractMaps[chain];
  const ABI = abiMaps[chain];

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      // eslint-disable-next-line max-len
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined);
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, library, account, chain]);
}

export function useCorContract({ withSignerIfPossible = true, defaultChain } = {}) {
  return useContract({ abiMaps: abiConfigs.COR, withSignerIfPossible, contractMaps: contractConfigs.COR, name: 'COR', defaultChain });
}

