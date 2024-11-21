import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigateをインポート
import "./Post.css"; // CSSファイルをリンク

interface JobPostProps {
  addJob: (newJob: { title: string; category: string; income: number }) => void;
}

export const JobPost: React.FC<JobPostProps> = ({ addJob }) => {
  const [selectCategory, setSelectCategory] = useState<string>(""); // カテゴリの選択肢
  const [income, setIncome] = useState<string>(""); // 年収（文字列として扱う）
  const [title, setTitle] = useState<string>(""); // 求人タイトル
  const navigate = useNavigate(); // useNavigateフック

  // フォーム送信時
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション: カテゴリ、年収、タイトルが必須
    if (!selectCategory || !title || !income) {
      alert("すべての項目を入力してください。");
      return;
    }

    addJob({ title, category: selectCategory, income: Number(income) }); // 年収を数値に変換
    navigate("/"); // 求人投稿後にホームにリダイレクト
  };

  return (
    <div className="post-container">
      <h2>求人投稿</h2>
      <form onSubmit={handleSubmit}>
        {/* 求人カテゴリ選択 */}
        <div className="category-select">
          <h3>求人カテゴリ選択</h3>
          <select
            value={selectCategory}
            onChange={(e) => setSelectCategory(e.target.value)}
          >
            <option value="">カテゴリを選択</option>
            <option value="エンジニア">エンジニア</option>
            <option value="営業">営業</option>
            <option value="マーケティング">マーケティング</option>
            <option value="管理職">管理職</option>
            <option value="デザイン">デザイン</option>
            <option value="金融">金融</option>
            <option value="ビジネス">ビジネス</option>
            <option value="ライティング">ライティング</option>
            <option value="人事">人事</option>
            <option value="法務">法務</option>
            <option value="サポート">サポート</option>
          </select>
        </div>

        {/* 年収入力 */}
        <div className="income">
          <h3>年収(万円)</h3>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)} // 文字列として扱う
            placeholder="例: 500"
          />
        </div>

        {/* 求人タイトル入力 */}
        <div className="title">
          <h3>求人タイトル</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="求人タイトル"
          />
        </div>

        <button type="submit">投稿</button>
      </form>
    </div>
  );
};


