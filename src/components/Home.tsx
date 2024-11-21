import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // CSSファイルをリンク
import { jobList } from "../data/jobList"; // jobList.tsをインポート

export const Home: React.FC = () => {
  const [query, setQuery] = useState<string>(""); // 検索クエリ
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // 選択された職種
  const [filteredJobs, setFilteredJobs] = useState(jobList); // フィルタリングされた求人一覧
  const navigate = useNavigate();

  // 職種のチェックボックスの変更ハンドラー
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((item) => item !== category); // チェック解除
      } else {
        return [...prevSelected, category]; // チェック追加
      }
    });
  };

  // 検索機能
  const handleSearch = () => {
    const lowerCaseQuery = query.toLowerCase();
    const results = jobList.filter((job) => {
      const matchesQuery = job.title.toLowerCase().includes(lowerCaseQuery);
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(job.category);
      return matchesQuery && matchesCategory;
    });
    setFilteredJobs(results);
  };

  // フィルタリング処理
  useEffect(() => {
    handleSearch(); // クエリや職種が変更されるたびに検索を実行
  }, [query, selectedCategories]);

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
        {/* 検索ボタン */}
        <button onClick={handleSearch}>検索</button>

        <h2>求人カテゴリ</h2>
        {/* 職種による絞り込み（チェックボックス） */}
        <div className="filter-checkboxes">
          {[
            "エンジニア",
            "営業",
            "マーケティング",
            "管理職",
            "デザイン",
            "金融",
            "ビジネス",
            "ライティング",
            "人事",
            "法務",
            "サポート",
          ].map((category) => (
            <label key={category} className="checkbox-label">
              <input
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
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
