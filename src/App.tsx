import React from "react";
import "./App.css";
import Autzen from "./pages/Autzen";
import Boulder from "./pages/Boulder";
import QuickstartWrite from "./pages/QuickstartWrite";
import Gtex from "./pages/Gtex";
import Header from "./components/Header";
import Intro from "./pages/Intro";
import Files from "./pages/Files";
import UDFs from "./pages/UDFs";
import SQL from "./pages/SQL/SQL";
import Menu from "./components/Menu";
import { Routes, Route } from "react-router-dom";
import routePaths from "./constants/routePaths/routePaths";
import { ConfigProvider } from 'antd';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Inter, sans-serif",
          colorPrimary: '#0077FF',
          borderRadius: 6
        },
        components: {
          Button: {
            fontWeight: 'bold'
          }
        }
      }}
    >   
      <Header />
      <div className="App">
        <Menu />
        <main className="App__main">
          <Routes>
            <Route path={routePaths.root} element={<Intro />} />
            <Route path={routePaths.gtex} element={<Gtex />} />
            <Route path={routePaths.lidar} element={<Autzen />} />
            <Route path={routePaths.boulder} element={<Boulder />} />
            <Route path={routePaths.writes} element={<QuickstartWrite />} />
            <Route path={routePaths.files} element={<Files />} />
            <Route path={routePaths.udfs} element={<UDFs />} />
            <Route path={routePaths.sql} element={<SQL />} />
          </Routes>
        </main>
      </div>
    </ConfigProvider>
  );
};

export default App;
