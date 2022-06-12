import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { useDispatch } from 'react-redux';
import { injected } from './connectors';

export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress = false) {
  const { active, activate, deactivate, library, account } = useWeb3React();
  const { player } = useDispatch();
  useEffect(async () => {
    if (!account) {
      return;
    }
    if (!active) {
      return;
    }
    if (!library) {
      return;
    }
    let playerAuth = {};
    const playerAuthRaw = localStorage.getItem('playerAuth');
    if (playerAuthRaw) {
      playerAuth = JSON.parse(playerAuthRaw);
    }
    if (playerAuth?.owner?.toLowerCase() === account.toLowerCase()) {
      console.log('==============check and load account==================');
      player.getPlayerInfo();
      return;
    }
    // await player.login({ account, library });
  }, [active, library, account]);

  const handleConnect = (e) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log("Handling 'connect' event with payload", e);
    }
    activate(injected);
  };
  const handleChainChanged = (chainId) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log("Handling 'chainChanged' event with payload", chainId);
    }
    activate(injected);
  };

  const handleAccountsChanged = async (accounts) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(new Date(), "Handling 'accountsChanged' event with payload", accounts);
    }
    deactivate();
    // player.logout();
  };

  const handleNetworkChanged = (networkId) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log("Handling 'networkChanged' event with payload", networkId);
    }
    activate(injected);
  };

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.on) {
      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    }
    return null;
  }, []);
}
