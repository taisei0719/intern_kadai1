import React, { useState } from "react";

export const Contact: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("お問い合わせを送信しました。");
    setMessage("");
  };

  return (
    <div>
      <h2>お問い合わせ</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="お問い合わせ内容を入力してください"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <br />
        <button type="submit">送信</button>
      </form>
    </div>
  );
};
