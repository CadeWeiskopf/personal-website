import React, { ReactNode } from "react";

interface IAppContext {}

const AppContext = React.createContext<IAppContext>({});

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = (
  props
) => {
  return <AppContext.Provider value={{}}>{props.children}</AppContext.Provider>;
};
