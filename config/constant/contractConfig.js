import BEP20_ABI from '@/config/abis/ERC20.json';
import POLYGON_ERC20_ABI from '@/config/abis/ERC20.json';
export const contractConfigs = {
  COR: {
    'binance': process.env.NEXT_PUBLIC_COR_CONTRACT,
    'polygon': process.env.NEXT_PUBLIC_POLYGON_COR_CONTRACT,
  },
};

export const abiConfigs = {
  COR: {
    'binance': BEP20_ABI,
    'polygon': POLYGON_ERC20_ABI,
  },
}

