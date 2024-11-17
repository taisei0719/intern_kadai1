import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { SearchResults } from "./components/SearchResults";
import { JobDetail } from "./components/JobDetail";
import { Contact } from "./components/Contact";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>求人検索サイト</h1>
          <nav>
            <Link to="/">ホーム</Link>
            <br />
            <Link to="/results">検索結果</Link>
            <br />
            <Link to="/contact">お問い合わせ</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<SearchResults />} />
          <Route path="/detail/:id" element={<JobDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;



