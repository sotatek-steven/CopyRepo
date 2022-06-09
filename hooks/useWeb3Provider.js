import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { rpcProviders } from '@/utils/provider';

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */

const useWeb3Provider = (chain) => {
  const { library, ...web3React } = useWeb3React();
  const [provider, setProvider] = useState(rpcProviders[chain] || library);
  return {
    library: provider,
    ...web3React,
  };
};

export default useWeb3Provider;
