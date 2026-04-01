"use client";

import { Comment } from "@/types/post";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <div>
      <p>{comment.author}</p>
      <p>{comment.content}</p>
      <p>{new Date(comment.createdAt).toLocaleString()}</p>
    </div>
  );
}