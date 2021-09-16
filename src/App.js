import React from "react";
import "./App.css";
import Gtex from "./Gtex";
import Header from "./Header";
import Intro from "./Intro";
import Menu from "./Menu";

const pages = {
  intro: "intro",
  gtex: "gtex",
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
        </main>
      </div>
    </div>
  );
}

export default App;
