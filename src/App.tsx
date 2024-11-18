import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { JobDetail } from "./components/JobDetail";
import { JobPost } from "./components/JobPost";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>求人検索アプリ</h1>
          <nav>
            <Link to="/">求人検索</Link>
            <br />
            <Link to="/post">求人投稿</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<JobDetail />} />
          <Route path="/post" element={<JobPost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;



