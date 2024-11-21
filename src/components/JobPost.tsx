// JobPost.tsx
import React, { useState } from "react";
import "./Post.css"; // CSSファイルをリンク

interface JobPostProps {
  addJob: (job: { title: string, category: string, income: number }) => void;
}

export const JobPost: React.FC<JobPostProps> = ({ addJob }) => {
  const [selectCategory, setSelectCategory] = useState<string>(""); // カテゴリの選択肢
  const [income, setIncome] = useState<number>(0); // 年収
  const [title, setTitle] = useState<string>(""); // 求人タイトル

  // 求人の投稿
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob = { title, category: selectCategory, income };
    addJob(newJob); // 親コンポーネントに求人を追加
    setTitle(""); // フォームをリセット
    setIncome(0); // フォームをリセット
    setSelectCategory(""); // フォームをリセット
  };

  return (
    <div className="post-container">
      <h2>求人投稿</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="category-select">
          <h2>求人カテゴリ選択</h2>
          <select value={selectCategory} onChange={(e) => setSelectCategory(e.target.value)}>
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

        <div className="income">
          <h2>年収(万円)</h2>
          <input
            type="number"
            placeholder="年収"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
          />
        </div>

        <div className="title">
          <h2>求人タイトル</h2>
          <input
            type="text"
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <button type="submit">投稿</button>
      </form>
    </div>
  );
};
