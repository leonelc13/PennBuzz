import React, { useState } from 'react';
import './commentStyle.css';

function CommentList({comments, handleAddComment, newComment, setNewComment}) {

  return (
    <div className="comment-list-container">
      <h2>Comments</h2>
      <ul className="comment-list">
        {comments.map((comment, index) => (
          <li key={index}>{comment.author}: {comment.content}</li>
        ))}
      </ul>
      <div className="comment-form">
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
}

export default CommentList;
