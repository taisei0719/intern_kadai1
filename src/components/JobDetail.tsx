import React from "react";
import { useParams } from "react-router-dom";
import { jobList } from "../data/jobList"; // jobList.tsをインポート

export const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const job = jobList.find((job) => job.id === parseInt(id || ""));

  if (!job) {
    return <p>求人情報が見つかりません。</p>;
  }

  return (
    <div>
      <h2>{job.title}</h2>
      <p>カテゴリ: {job.category}</p>
      <p>年収: {job.income}万円</p>
    </div>
  );
};
