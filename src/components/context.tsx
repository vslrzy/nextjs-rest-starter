'use client';

import { useSearchParams } from 'next/navigation';
import { createContext, useContext } from 'react';

type Props = {
  passed: any;
};

const GlobalContext = createContext({ passed: '' });

export function ContextFunction() {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children, testvalue }: any) {
  const searchParams = useSearchParams();
  const search = searchParams.get('page');
  const passed = testvalue;

  const value = { passed, search };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
