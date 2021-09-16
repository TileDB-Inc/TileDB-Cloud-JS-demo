import "./App.css";
import Gtex from "./Gtex";
import Header from "./Header";
import Intro from "./Intro";

function App() {
  return (
    <div>
      <Header />
      <div className="App">
        <Intro />
        <Gtex />
      </div>
    </div>
  );
}

export default App;
