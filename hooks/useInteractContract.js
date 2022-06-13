/* eslint-disable no-useless-catch */
import { useCallback } from 'react';

import {
  approved, approveForAll
} from '@/utils/contract.js';

export const useApprove = (
  mainContract,
  useContract,
  maxLimit,
) => {
  const handleApprove = useCallback(async () => {
    try {
      const receipt = await approved(mainContract, useContract, maxLimit);
      return receipt.status;
    } catch (e) {
      throw (e);
    }
  }, [useContract, mainContract, maxLimit]);

  return { onApprove: handleApprove };
};

export const useApproveForAll = (contract, marketAddress) => {
  const handleApproveForAll = useCallback(async () => {
    try {
      const receipt = await approveForAll(contract, marketAddress);
      return receipt.status;
    } catch (e) {
      throw (e);
    }
  }, [contract, marketAddress]);

  return { approveForAll: handleApproveForAll };
};
