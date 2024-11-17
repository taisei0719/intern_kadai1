import React from "react";
import { useParams } from "react-router-dom";
import { Job } from "../types";

const mockJobs: Job[] = [
  { id: 1, title: "ソフトウェアエンジニア", location: "東京", description: "Webアプリ開発。" },
  { id: 2, title: "プロジェクトマネージャー", location: "大阪", description: "プロジェクト管理業務。" },
  { id: 3, title: "データアナリスト", location: "リモート", description: "データ解析。" },
];

export const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const job = mockJobs.find((job) => job.id === parseInt(id || ""));

  if (!job) {
    return <p>求人情報が見つかりません。</p>;
  }

  return (
    <div>
      <h2>{job.title}</h2>
      <p>勤務地: {job.location}</p>
      <p>{job.description}</p>
    </div>
  );
};
