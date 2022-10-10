import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const RPC_URLS = {
  1: 'https://mainnet.infura.io/',
  3: 'https://rinkeby.infura.io/',
  5: 'https://goerli.infura.io/',
  42: 'https://kovan.infura.io/',
  56: 'https://bsc-dataseed.binance.org/',
  97: 'https://data-seed-prebsc-1-s2.binance.org:8545/',
  80001: 'https://rpc-mumbai.matic.today/',
  137: 'https://polygon-rpc.com/',
  250: 'https://rpcapi.fantom.network',
  128: 'https://http-mainnet.hecochain.com',
  66: 'http://okexchain-rpc1.okex.com:26659',
  100: 'https://rpc.xdaichain.com',
  88: 'https://rpc.tomochain.com',
  1284: 'https://rpc.api.moonbeam.network',
};

export const injected = new InjectedConnector({
  supportedChainIds: [56, 97, 137, 80001, 1, 3, 5, 42, 250, 128, 66, 100, 88, 1284],
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    56: RPC_URLS[56] || '',
    97: RPC_URLS[97] || '',
    80001: RPC_URLS[80001] || '',
    137: RPC_URLS[137] || '',
    1: RPC_URLS[1] || '',
    3: RPC_URLS[3] || '',
    5: RPC_URLS[5] || '',
    42: RPC_URLS[42] || '',
    250: RPC_URLS[250] || '',
    128: RPC_URLS[128] || '',
    66: RPC_URLS[66] || '',
    100: RPC_URLS[100] || '',
    88: RPC_URLS[88] || '',
    1284: RPC_URLS[1284] || '',
  },
  qrcode: true,
});
