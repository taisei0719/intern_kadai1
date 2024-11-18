import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // CSSファイルをリンク

const jobList = [
  { id: 1, title: "フロントエンドエンジニア", category: "エンジニア", income: "600" },
  { id: 2, title: "バックエンドエンジニア", category: "営業", income: "350" },
  { id: 3, title: "プロジェクトマネージャー", category: "マーケティング", income: "800" },
];

export const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/results?query=${query}`);
  };

  return (
    <div className="home-container">
      {/* 検索セクション */}
      <div className="search-section">
        <h2>求人検索</h2>
        <input
          type="text"
          placeholder="職種や勤務地を入力"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>検索</button>
      </div>

      {/* 求人一覧 */}
      <div className="job-list-section">
        <h2>求人一覧</h2>
        <ul className="job-list">
          {jobList.map((job) => (
            <li key={job.id} className="job-item">
              <h3>{job.title}</h3>
              <p>カテゴリ: {job.category}</p>
              <p>年収: {job.income}万円</p>
              <button onClick={() => navigate(`/detail/${job.id}`)}>詳細を見る</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
