import React from "react";
import "./App.css";
import Autzen from "./pages/Autzen";
import Boulder from "./pages/Boulder";
import QuickstartWrite from "./pages/QuickstartWrite";
import Gtex from "./pages/Gtex";
import Header from "./components/Header";
import Intro from "./pages/Intro";
import Menu from "./components/Menu";
import { Routes, Route } from "react-router-dom";
import routePaths from "./constants/routePaths/routePaths";

function App() {
  return (
    <div>
      <Header />
      <div className="App">
        <Menu />
        <main className="App__main">
          <Routes>
            <Route exact path={routePaths.root} element={<Intro />} />
            <Route path={routePaths.gtex} element={<Gtex />} />
            <Route path={routePaths.lidar} element={<Autzen />} />
            <Route path={routePaths.boulder} element={<Boulder />} />
            <Route path={routePaths.writes} element={<QuickstartWrite />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
