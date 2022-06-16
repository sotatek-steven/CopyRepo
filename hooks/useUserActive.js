import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

/**
 * Check if user exist
 * Get token from localStorage
 */

const useUserBackup = () => {
  const { deactivate } = useWeb3React();
  const { player } = useDispatch();
  const playerState = useSelector((state) => state.player);

  const restoreUserAuth = () => {
    const playerAuthString = localStorage.getItem('playerAuth');
    if (playerAuthString) {
      try {
        const playerAuth = JSON.parse(playerAuthString);
        player.setPlayerAuth(playerAuth);
      } catch (error) {
        console.log('restoreUserAuth: ', error);
      }
    }
  };
  
  const deactiveUser = () => {
    toast.error('Your session be expired. Please connect your wallet again.');
    deactivate();
  };

  useEffect(() => {
    restoreUserAuth();
  }, []);

  // useEffect(() => {
  //   if (playerState?.tokenExpired) {
  //     deactiveUser();
  //   }
  // }, [playerState?.tokenExpired]);
};

export default useUserBackup;
