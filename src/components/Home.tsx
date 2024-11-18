import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const jobList = [
  { id: 1, title: "フロントエンドエンジニア", location: "東京", description: "Reactを使用した開発" },
  { id: 2, title: "バックエンドエンジニア", location: "大阪", description: "Node.jsを使用した開発" },
  { id: 3, title: "プロジェクトマネージャー", location: "福岡", description: "プロジェクト全体の管理" },
];

export const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/results?query=${query}`);
  };

  return (
    <div>
      <h2>求人検索</h2>
      <input
        type="text"
        placeholder="職種や勤務地を入力"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>検索</button>

      <h2>求人一覧</h2>
      <ul>
        {jobList.map((job) => (
          <li key={job.id} style={{ marginBottom: "1rem" }}>
            <h3>{job.title}</h3>
            <p>勤務地: {job.location}</p>
            <p>{job.description}</p>
            <button onClick={() => navigate('/detail/${job.id}')}>詳細を見る</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
