import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // CSSファイルをリンク
import { jobList } from "../data/jobList"; // jobList.tsをインポート

export const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [filteredJobs, setFilteredJobs] = useState(jobList);
  const navigate = useNavigate();

  //検索機能
  const handleSearch = () => {
    const lowerCaseQuery = query.toLowerCase();
    const results = jobList.filter(
      (job) =>
        job.title.toLowerCase().includes(lowerCaseQuery) ||
        job.category.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredJobs(results);
  };

  // 職種で絞り込みを行う関数
  const filterByCategory = (category: string) => {
    const results = jobList.filter((job) => job.category === category);
    setFilteredJobs(results);
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

        {/* 職種による絞り込みボタン */}
        <div className="filter-buttons">
          <button onClick={() => filterByCategory("エンジニア")}>エンジニア</button>
          <button onClick={() => filterByCategory("営業")}>営業</button>
          <button onClick={() => filterByCategory("マーケティング")}>マーケティング</button>
          <button onClick={() => filterByCategory("管理職")}>管理職</button>
          <button onClick={() => filterByCategory("デザイン")}>デザイン</button>
          <button onClick={() => filterByCategory("金融")}>金融</button>
          <button onClick={() => filterByCategory("ビジネス")}>ライティング</button>
          <button onClick={() => filterByCategory("人事")}>人事</button>
          <button onClick={() => filterByCategory("法務")}>法務</button>
          <button onClick={() => filterByCategory("サポート")}>サポート</button>
          <button onClick={() => setFilteredJobs(jobList)}>すべて表示</button>
        </div>
      </div>

      {/* 求人一覧 */}
      <div className="job-list-section">
        <h2>求人一覧</h2>
        <p>該当件数: {filteredJobs.length}件</p>
        {filteredJobs.length > 0 ? (
          <ul className="job-list">
            {filteredJobs.map((job) => (
              <li key={job.id} className="job-item">
                <h3>{job.title}</h3>
                <p>カテゴリ: {job.category}</p>
                <p>年収: {job.income}万円</p>
                <button onClick={() => navigate(`/detail/${job.id}`)}>詳細を見る</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>該当する求人が見つかりませんでした。</p>
        )}
      </div>
    </div>
  );
};
