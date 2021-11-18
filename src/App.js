import React from "react";
import "./App.css";
import Autzen from "./Autzen";
import Boulder from "./Boulder";
import QuickstartWrite from "./QuickstartWrite";
import Gtex from "./Gtex";
import Header from "./Header";
import Intro from "./Intro";
import Menu from "./Menu";
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
