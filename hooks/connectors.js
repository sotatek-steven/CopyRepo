import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const RPC_URLS = {
  56: 'https://bsc-dataseed.binance.org/',
  97: 'https://data-seed-prebsc-1-s2.binance.org:8545/',
  80001: 'https://rpc-mumbai.matic.today/',
  137: 'https://polygon-rpc.com/',
};

export const injected = new InjectedConnector({
  supportedChainIds: [
    56, 97, 137, 80001, 
  ],
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    56: RPC_URLS[56] || '',
    97: RPC_URLS[97] || '',
    80001: RPC_URLS[80001] || '',
    137: RPC_URLS[137] || '',
  },
  qrcode: true,
});
