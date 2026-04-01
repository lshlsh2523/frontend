"use client";

import { useRouter } from "next/navigation";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/community/${post.id}`)}>
      <h2>{post.title}</h2>
      <p>작성자: {post.author}</p>
      <p>작성일: {new Date(post.createdAt).toLocaleString()}</p>
      <p>좋아요: {post.likes}</p>
      <p>댓글: {post.comments.length}</p>
    </div>
  );
}