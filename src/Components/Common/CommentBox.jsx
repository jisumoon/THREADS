import React, { useState } from "react";

const CommentBox = ({ username }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    // 제출 로직 작성

    setComment("");
  };

  return (
    <div className="comment-box">
      <div className="comment-user">{username}</div>
      <textarea
        value={comment}
        onChange={handleCommentChange}
        placeholder="내용을 작성하세요"
      />
      <div className="comment-actions">
        <button>스레드 완료</button>
      </div>
    </div>
  );
};

export default CommentBox;
