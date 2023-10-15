import React, { ReactNode } from "react";

interface IAppContext {}

const AppContext = React.createContext<IAppContext>({});

interface AppContextProviderProps {
  children: ReactNode;
  // Define any props that you might want to pass in the future
  // For now, it's an empty interface because there are no specific props.
}

export const AppContextProvider: React.FC<AppContextProviderProps> = (
  props
) => {
  return <AppContext.Provider value={{}}>{props.children}</AppContext.Provider>;
};
