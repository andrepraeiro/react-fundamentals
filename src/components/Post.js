import React from "react";
import Comment from "./Comment";

// import { Container } from './styles';

export default function Post({ data }) {
  return (
    <div className="post">
      <div className="post-header">
        <img
          className="avatar"
          src={data.author.avatar}
          alt={data.author.name}
        />
        <div className="details">
          <span>{data.author.name}</span>
          <span>{data.date}</span>
        </div>
      </div>
      <p className="post-content">{data.content}</p>
      <div className="post-comments">
        <div className="divider" />
        {data.comments.map(comment => (
          <Comment key={comment.id} data={comment} />
        ))}
      </div>
    </div>
  );
}
