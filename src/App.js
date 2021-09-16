import React from "react";
import "./App.css";
import Autzen from "./Autzen";
import Boulder from "./Boulder";
import Gtex from "./Gtex";
import Header from "./Header";
import Intro from "./Intro";
import Menu from "./Menu";

const pages = {
  intro: "intro",
  gtex: "gtex",
  lidar: "lidar",
  boulder: "boulder",
  
};

function App() {
  const [page, setPage] = React.useState(pages.intro);

  return (
    <div>
      <Header />
      <div className="App">
        <Menu onClick={setPage} />
        <main className="App__main">
          {page === pages.intro && <Intro />}

          {page === pages.gtex && <Gtex />}

          {page === pages.lidar && <Autzen />}

          {page === pages.boulder && <Boulder />}
        </main>
      </div>
    </div>
  );
}

export default App;
