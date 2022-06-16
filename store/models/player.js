import { createModel } from '@rematch/core';
import { signMessage } from '@/utils/contract';
import { getRequest, postRequest } from '../../utils/httpRequest';
const player = createModel({
  state: {
    playerInfo: null,
    playerAuth: null,
    tokenExpired: false,
  },
  reducers: {
    setPlayerInfo: (state, playerInfo) => ({
      ...state,
      playerInfo,
    }),
    setPlayerAuth: (state, playerAuth) => {
      localStorage?.setItem('playerAuth', JSON.stringify(playerAuth));
      return {
        ...state,
        playerAuth,
      };
    },
    setTokenExpired: (state, hasExpired) => ({
      ...state,
      tokenExpired: hasExpired,
    }),
    setPlayerAuthExtend: (state, info) => {
      const playerAuth = { ...state.playerAuth, ...info };
      localStorage?.setItem('playerAuth', JSON.stringify(playerAuth));
      return {
        ...state,
        playerAuth,
      };
    },
    clearAll: () => {
      localStorage?.removeItem('playerAuth');
      return {
        playerInfo: null,
        playerAuth: null,
        tokenExpired: false,
      };
    },
  },
  effects: (dispatch) => {
    const { player } = dispatch;
    const userModoel = player;
    return {
      async getPlayerInfo(payload, state) {
        console.log('Load player info');
        const res = await getRequest({ url: '/api/v1/users', userState: state.player, userModoel })
        
        if (res.code === 200) {
          const data = res.data;
          player.setTokenExpired(false);
          player.setPlayerInfo(data);
          return data;
        }
        return null;
      },
      async login({ account, library }) {
        const timestamp = Date.now();
        const signer = await signMessage(`dragdrop#${timestamp}`, library);
        const payload = {
          owner: account,
          signed: signer?.signature,
          timestamp: timestamp,
        };
        const { data } = await postRequest({ url: '/api/v1/users/login', auth: false, body: payload });
        if(!data){
          return false;
        }
        console.log('data: ', data);
        player.setTokenExpired(false);
        player.setPlayerAuth(data);
        player.setPlayerInfo(data);
        return true;
      },
      async logout(payload, state) {
        console.log('logout when player auth empty');
        if (!state.player.playerAuth) {
          player.clearAll();
          return null;
        }
        console.log('logout');

        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_API_URL}/api/market/v1/players/${state.player.playerAuth?.owner}/logout`,
        //   {
        //     method: 'PUT',
        //     headers: {
        //       Authorization: `Bearer ${state.player.playerAuth?.token}`,
        //     },
        //   }
        // );
        // const res = await response.json();
        await player.clearAll();
        return null;
      },
    };
  },
});

export default player;
