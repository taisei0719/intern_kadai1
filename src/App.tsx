import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { JobDetail } from "./components/JobDetail";
import { JobPost } from "./components/JobPost";
import { useState } from "react";
import { jobList as initialJobList } from "./data/jobList";

const App: React.FC = () => {

  const [jobList, setJobList] = useState(initialJobList); // 求人リストの状態

  // 新しい求人をjobListに追加
  const addJob = (newJob: { title: string; category: string; income: number }) => {
    setJobList((prevJobList) => [...prevJobList, { id: prevJobList.length + 1, ...newJob }]);
  };


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
          <Route path="/" element={<Home jobList={jobList} />} />
          <Route path="/detail/:id" element={<JobDetail />} />
          {/* addJob を渡す */}
          <Route path="/post" element={<JobPost addJob={addJob} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;



