import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/results?query=${query}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="職種や勤務地を入力"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>検索</button>
    </div>
  );
};
