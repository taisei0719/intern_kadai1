import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // CSSファイルをリンク
import { Job } from "../types";  // Job型をインポート

// Homeコンポーネントのpropsの型を定義
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


  useEffect(() => {
    setFilteredJobs(jobList); // jobListが更新されたらfilteredJobsも更新
  }, [jobList]);

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

      // 年収フィルタリング
      const matchesIncome = selectedIncome ? job.income >= parseInt(selectedIncome) : true;

      return matchesQuery && matchesCategory && matchesIncome;
    });
    setFilteredJobs(results);
  };

  // フィルタリング処理
  useEffect(() => {
    handleSearch(); // クエリや職種が変更されるたびに検索を実行
  }, [query, selectedCategories, selectedIncome]);

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

        <h2>年収</h2>
        {/* 年収による絞り込み（50万円ごとに選択肢を追加） */}
        <div className="income-filter">
          <select value={selectedIncome} onChange={(e) => setSelectedIncome(e.target.value)}>
            <option value="">選択してください</option>
            <option value="500">500万円以上</option>
            <option value="550">550万円以上</option>
            <option value="600">600万円以上</option>
            <option value="650">650万円以上</option>
            <option value="700">700万円以上</option>
            <option value="750">750万円以上</option>
            <option value="800">800万円以上</option>
            <option value="850">850万円以上</option>
            <option value="900">900万円以上</option>
            <option value="950">950万円以上</option>
            <option value="1000">1000万円以上</option>
          </select>
        </div>
      </div>

      {/* 求人一覧 */}
      <div className="job-list-section">
        <h2>求人一覧</h2>
        <p>該当件数: {filteredJobs.length}件</p>
        {currentJobs.length > 0 ? (
          <ul className="job-list">
            {currentJobs.map((job) => (
              <li
                key={job.id}
                className="job-item"
                onClick={() => navigate(`/detail/${job.id}`)} // 求人全体をクリックで詳細ページへ遷移
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

