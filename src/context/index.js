import React from "react";

export const appCtx = React.createContext();

export const Provider = appCtx.Provider;

export const useCtx = () => React.useContext(appCtx);
