import React, { useContext } from "react";
import "./App.css";
import { AppContext, AppContextProvider } from "./AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home, { NameAndTitle } from "./pages/home/Home";
import Nav from "./components/nav/Nav";
import Contact from "./pages/contact/Contact";

const App: React.FC = () => {
  const { showHeader } = useContext(AppContext);

  return (
    <div className="app">
      <header></header>
      <main>
        <BrowserRouter>
          <Nav />
          {showHeader && (
            <div style={{ paddingTop: "0.5rem", paddingRight: "0.5rem" }}>
              <NameAndTitle alignItems="flex-end" />
            </div>
          )}
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/contact"
              element={<Contact />}
            />
          </Routes>
        </BrowserRouter>
      </main>
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
