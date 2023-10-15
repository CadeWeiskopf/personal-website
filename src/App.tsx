import React from "react";
import "./App.css";
import { AppContextProvider } from "./AppContext";

const App: React.FC = () => {
  return (
    <div className="app">
      <header>h</header>
      <main>m</main>
      <footer>f</footer>
    </div>
  );
};

const AppModule = () => {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
};

export default AppModule;
