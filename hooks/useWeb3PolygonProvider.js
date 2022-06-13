import { useEffect, useState, useRef } from 'react';
import { useWeb3React } from '@web3-react/core';
import { polygonRpcProvider } from '@/utils/providerPolygon.js';

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */

const useWeb3PolygonProvider = () => {
  const { library, chainId, ...web3React } = useWeb3React();
  const refEth = useRef(library);
  const [provider, setProvider] = useState(library || polygonRpcProvider);

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || polygonRpcProvider);
      refEth.current = library;
    }
  }, [library]);

  return {
    polygonLibrary: provider,
    chainId: chainId ?? parseInt('80001', 10),
    ...web3React,
  };
};

export default useWeb3PolygonProvider;
