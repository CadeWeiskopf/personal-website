import React from "react";
import "./App.css";
import { AppContextProvider } from "./AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";

const App: React.FC = () => {
  return (
    <div className="app">
      <header>h</header>
      <main>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home />}
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
