import { createModel } from '@rematch/core';
import { signMessage } from '@/utils/contract';

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
    return {
      async getPlayerInfo(payload, state) {
        console.log('Load player info');
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
          {
            headers: {
              Authorization: `Bearer ${state.player.playerAuth?.token}`,
            },
          }
        );
        const res = await response.json();
        if (res.code === 200) {
          const data = res.data;
          player.setTokenExpired(false);
          player.setPlayerInfo(data);
          return data;
        } else if (res.code === 1001) {
          // token expired
          player.clearAll();
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        const res = await response.json();
        if (res.code === 200) {
          player.setTokenExpired(false);
          player.setPlayerAuth(res.data);
          player.setPlayerInfo(res.data);
        } else if (res.code === 1001) {
          // token expired
          player.clearAll();
        }
        return res;
      },
      async setupAccount(payload, state) {
        if (!state.player.playerAuth?.token) return null;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/market/v1/players/${state.player.playerAuth?.owner}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${state.player.playerAuth?.token}`,
            },
            body: JSON.stringify(payload),
          }
        );
        const res = await response.json();
        if (res.code === 200) {
          // nothing
          player.setPlayerAuth({ ...state.player.playerAuth, emailUpdated: payload.email });
        } else if (res.code === 1001) {
          player.setTokenExpired(true);
        }
        return res;
      },
      async updatePlayerName(payload, state) {
        if (!state.player.playerAuth?.token) return null;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/market/v1/players/${state.player.playerAuth?.owner}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${state.player.playerAuth?.token}`,
            },
            body: JSON.stringify(payload),
          }
        );
        const res = await response.json();
        if (res.code === 200) {
          // nothing
          player.setPlayerAuth({ ...state.player.playerAuth, name: payload.name });
          player.setPlayerInfo({ ...state.player.playerAuth, name: payload.name });
        } else if (res.code === 1001) {
          player.setTokenExpired(true);
        }
        return res;
      },
      async updatePlayerEmail(payload, state) {
        if (!state.player.playerAuth?.token) return null;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/market/v1/players/${state.player.playerAuth?.owner}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${state.player.playerAuth?.token}`,
            },
            body: JSON.stringify(payload),
          }
        );
        const res = await response.json();
        if (res.code === 200) {
          // nothing
          player.setPlayerAuth({ ...state.player.playerAuth, emailUpdated: payload.email });
        } else if (res.code === 1001) {
          player.setTokenExpired(true);
        }
        return res;
      },
      async updatePlayerPassword(payload, state) {
        if (!state.player.playerAuth?.token) return null;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/market/v1/players/${state.player.playerAuth?.owner}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${state.player.playerAuth?.token}`,
            },
            body: JSON.stringify(payload),
          }
        );
        const res = await response.json();
        if (res.code === 200) {
          // nothing
        } else if (res.code === 1001) {
          player.setTokenExpired(true);
        }
        return res;
      },
      async forgotPassword(payload, state) {
        if (!state.player.playerAuth?.token) return null;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/market/v1/players/forgot`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.player.playerAuth?.token}`,
          },
        });
        const res = await response.json();
        if (res.code === 200) {
          // nothing
        } else if (res.code === 1001) {
          player.setTokenExpired(true);
        }
        return res;
      },
      async recoverPassword(payload, state) {
        if (!state.player.playerAuth?.token) return null;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/market/v1/players/recovery-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.player.playerAuth?.token}`,
          },
          body: JSON.stringify(payload),
        });
        const res = await response.json();
        if (res.code === 200) {
          // nothing
        } else if (res.code === 1001) {
          player.setTokenExpired(true);
        }
        return res;
      },
      async confirmEmail(payload, state) {
        if (!state.player.playerAuth?.token) return null;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/market/v1/players/confirm-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.player.playerAuth?.token}`,
          },
          body: JSON.stringify(payload),
        });
        const res = await response.json();
        if (res.code === 200) {
          // nothing
          delete state.player.playerAuth?.emailUpdated;
          player.setPlayerAuth({ ...state.player.playerAuth, email: payload.email });
        } else if (res.code === 1001) {
          player.setTokenExpired(true);
        }
        return res;
      },
      async logout(payload, state) {
        if (!state.player.playerAuth) {
          player.clearAll();
          return null;
        }

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
