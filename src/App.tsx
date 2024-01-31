import React, { useContext } from "react";
import "./App.css";
import { AppContext, AppContextProvider } from "./AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import routes from "./AppRoutes";
import { AlignItems, Header } from "./components/header/Header";

const App: React.FC = () => {
  const { showHeader } = useContext(AppContext);

  return (
    <div className="app">
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
