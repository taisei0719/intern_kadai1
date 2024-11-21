import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // CSSファイルをリンク
import { Job } from "../types"; // Job型をインポート

interface HomeProps {
  jobList: Job[]; // jobList を props として受け取る型
}

export const Home: React.FC<HomeProps> = ({ jobList }) => {
  const [query, setQuery] = useState<string>(""); // 検索クエリ
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // 選択された職種
  const [selectedIncome, setSelectedIncome] = useState<string>(""); // 年収フィルターの選択肢
  const [filteredJobs, setFilteredJobs] = useState(jobList); // フィルタリングされた求人一覧
  const [currentPage, setCurrentPage] = useState<number>(1); // 現在のページ
  const jobsPerPage = 10; // 1ページあたりの求人数
  const navigate = useNavigate();

  // ページごとに表示する求人を計算
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // 最大ページ数を計算
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // ページ変更時の処理
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // ページ変更後に最上部にスクロール
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
        <button onClick={() => handlePageChange(1)}>検索</button>

        {/* 職種による絞り込み */}
        <div className="filter-checkboxes">
          {/* チェックボックス */}
          {/* ... */}
        </div>

        {/* 年収による絞り込み */}
        <div className="income-filter">
          {/* 年収フィルター */}
          {/* ... */}
        </div>
      </div>

      {/* 求人一覧 */}
      <div className="job-list-section">
        <h2>求人一覧</h2>
        {currentJobs.length > 0 ? (
          <ul className="job-list">
            {currentJobs.map((job) => (
              <li
                key={job.id}
                className="job-item"
                onClick={() => navigate(`/detail/${job.id}`)} // 詳細ページへ遷移
              >
                <h3>{job.title}</h3>
                <p>カテゴリ: {job.category}</p>
                <p>年収: {job.income}万円</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>該当する求人が見つかりませんでした。</p>
        )}

        {/* ページネーション */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

