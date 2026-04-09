import React, { useRef } from "react";
import { AppStore, makeStore } from ".";
import { Provider } from "react-redux";

const StoreProvder = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
export default StoreProvder;