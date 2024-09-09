'use client';
import type { AppStore } from '@/lib/store';
import { makeStore } from '@/lib/store';
import { setupListeners } from '@reduxjs/toolkit/query';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

interface Properties {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Properties) => {
  const storeReference = useRef<AppStore | null>(null);

  if (!storeReference.current) {
    // Create the store instance the first time this renders
    storeReference.current = makeStore();
  }

  useEffect(() => {
    if (storeReference.current != undefined) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeReference.current.dispatch);
      return unsubscribe;
    }
  }, []);

  console.log('store provider..');
  return <Provider store={storeReference.current}>{children}</Provider>;
};
