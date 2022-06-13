import { useEffect, useState, useRef } from 'react';
import { useWeb3React } from '@web3-react/core';
import { binanceRpcProvider } from '@/utils/providerBinance.js';

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */

const useWeb3BinanceProvider = () => {
  const { library, chainId, ...web3React } = useWeb3React();
  const refEth = useRef(library);
  const [provider, setProvider] = useState(library || binanceRpcProvider);

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || binanceRpcProvider);
      refEth.current = library;
    }
  }, [library]);

  return {
    binanceLibrary: provider,
    chainId: chainId ?? parseInt('97', 10),
    ...web3React,
  };
};

export default useWeb3BinanceProvider;
