import React from "react";
import { useParams } from "react-router-dom";
import { jobList } from "../data/jobList"; // jobListをインポート
import "./Detail.css"; // CSSファイルをリンク

export const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // idは文字列として受け取る
  const job = jobList.find((job) => job.id === Number(id));  // idを数値に変換して比較

  if (!job) {
    return <p>求人情報が見つかりません。</p>;
  }

  return (
    <div className="detail-container">
      <h2>{job.title}</h2>
      <p>カテゴリ: {job.category}</p>
      <p>年収: {job.income}万円</p>
    </div>
  );
};

