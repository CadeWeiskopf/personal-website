import React, { useContext } from "react";
import "./App.css";
import { AppContext, AppContextProvider } from "./AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import routes from "./AppRoutes";
import { AlignItems, Header } from "./components/header/Header";
import Outerspace from "./components/outerspace/Outerspace";

const App: React.FC = () => {
  const { showHeader } = useContext(AppContext);

  return (
    <div className="app">
      <Outerspace />
      <BrowserRouter>
        <Nav />
        {showHeader && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Header
              alignItems={AlignItems.FlexEnd}
              initAnim={false}
              smallText={true}
            />
          </div>
        )}
        <main>
          <div className="main-wrapper">
            <Routes>
              {routes.map((route, index) => {
                return (
                  <Route
                    key={`app-route-${index}`}
                    path={route.path}
                    element={route.component}
                  />
                );
              })}
            </Routes>
          </div>
        </main>
        <footer style={{ textAlign: "right", paddingRight: "8px" }}>
          <small>All rights reserved, Cade Weiskopf</small>
        </footer>
      </BrowserRouter>
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
