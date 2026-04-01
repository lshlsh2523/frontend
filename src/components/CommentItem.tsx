"use client";

import { Comment } from "@/types/post";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const timeLabel = new Date(comment.createdAt).toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <li className="list-none px-4 py-4 sm:px-5">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-xs text-gray-500">
        <span className="font-medium text-gray-700">{comment.author}</span>
        <time dateTime={comment.createdAt}>{timeLabel}</time>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-gray-800">{comment.content}</p>
    </li>
  );
}
