import { useMemo } from 'react';
import { init } from '@rematch/core';
import {
  ticket, market, contract, pet, item, player, consumable, builder, marketInfo, farmSPetNFT, farmNFTCor, farmCorCor,
} from './models';

let store;

const exampleInitialState = {

};

export const initStore = (initialState = exampleInitialState) => init({
  models: {
    ticket,
    contract,
  },
  redux: {
    initialState,
  },
});

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
