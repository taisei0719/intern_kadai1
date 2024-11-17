import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Job } from "../types";

const mockJobs: Job[] = [
  { id: 1, title: "ソフトウェアエンジニア", location: "東京", description: "Webアプリ開発。" },
  { id: 2, title: "プロジェクトマネージャー", location: "大阪", description: "プロジェクト管理業務。" },
  { id: 3, title: "データアナリスト", location: "リモート", description: "データ解析。" },
];

export const SearchResults: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query") || "";

  const filteredJobs = mockJobs.filter((job) =>
    job.title.includes(query)
  );

  return (
    <div>
      <h2>検索結果</h2>
      {filteredJobs.length === 0 ? (
        <p>該当する求人はありません。</p>
      ) : (
        <ul>
          {filteredJobs.map((job) => (
            <li key={job.id}>
              <Link to={`/detail/${job.id}`}>
                {job.title} - {job.location}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

  
  