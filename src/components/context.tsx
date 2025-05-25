"use client";

import { useSearchParams } from "next/navigation";
import { createContext, Suspense, useContext } from "react";

type Props = {
  passed: any;
};

const GlobalContext = createContext<Props>({ passed: "" });

export function ContextFunction() {
  return useContext(GlobalContext);
}

// INNER
function GlobalProviderInner({ children, testvalue }: any) {
  const searchParams = useSearchParams();
  const search = searchParams.get("page");
  const passed = testvalue;

  const value = { passed, search };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export function GlobalProvider({ children, testvalue }: any) {
  return (
    <Suspense fallback={null}>
      <GlobalProviderInner testvalue={testvalue}>
        {children}
      </GlobalProviderInner>
    </Suspense>
  );
}
