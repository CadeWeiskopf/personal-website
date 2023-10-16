import React, { ReactNode, useState } from "react";

interface IAppContext {
  showHeader: boolean;
  setShowHeader: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = React.createContext<IAppContext>({
  showHeader: false,
  setShowHeader: () => {},
});

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = (
  props
) => {
  const [showHeader, setShowHeader] = useState(false);
  return (
    <AppContext.Provider value={{ showHeader, setShowHeader }}>
      {props.children}
    </AppContext.Provider>
  );
};
