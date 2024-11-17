import "./App.css";

import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import { Home } from "./components/Home";
import { Page1 } from "./components/Page1";
import { Page2 } from "./components/Page2";
import { Page3 } from "./components/Page3";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <br />
          <Link to="/page1">Page1</Link>
          <br />
          <Link to="/page2">Page2</Link>
          <br />
          <Link to="/page3">Page3</Link>
          <br />
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

