import { useEffect } from 'react';
// import { toast } from 'react-toastify';

const AutoSwitchNetwork = () => {
  // const checkBSCMainnet = async () => {
  //   const windowWeb3 = window;
  //   if (windowWeb3.ethereum) {
  //     try {
  //       await windowWeb3.ethereum.request({
  //         method: 'wallet_switchEthereumChain',
  //         params: [{ chainId: '0x38' }],
  //       });
  //     } catch (error) {
  //       if (error.code === 4902) {
  //         try {
  //           await windowWeb3.ethereum.request({
  //             method: 'wallet_addEthereumChain',
  //             params: [
  //               {
  //                 chainId: '0x38',
  //                 chainName: 'Binance Smart Chain',
  //                 rpcUrls: ['https://bsc-dataseed.binance.org/'],
  //                 blockExplorerUrls: ['https://bscscan.com'],
  //                 nativeCurrency: {
  //                   name: 'BNB',
  //                   symbol: 'BNB',
  //                   decimals: 18,
  //                 },
  //                 iconUrls: [
  //                   'https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png',
  //                 ],
  //               },
  //             ],
  //           });
  //         } catch (addError) {
  //           toast.error(addError);
  //         }
  //       }
  //       toast.error(error);
  //     }
  //   } else {
  //     toast.error(
  //       'MetaMask is not installed. Please consider installing it: https://metamask.io/download.html',
  //     );
  //   }
  // };
  useEffect(() => {
    // checkBSCMainnet();
  }, []);
  return <div></div>;
};

export default AutoSwitchNetwork;
