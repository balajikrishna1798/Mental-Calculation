"use client";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Fragment } from "react";
import store, { persister } from "@/store/store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          {children}
        </PersistGate>
      </Provider>
    </Fragment>
  );
}
