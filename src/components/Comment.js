import React from "react";
import { comment } from "postcss";

export default function Comment({ data }) {
  return (
    <div className="comment">
      <img className="avatar" src={data.author.avatar} alt={data.author.name} />
      <p>
        <span>{data.author.name}</span>
        {data.content}
      </p>
    </div>
  );
}
