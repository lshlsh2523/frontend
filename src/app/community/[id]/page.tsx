"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getPosts, savePosts } from "@/lib/mockData";
import { Post, Comment } from "@/types/post";
import CommentItem from "@/components/CommentItem";

export default function PostDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    const posts = getPosts();
    const foundPost = posts.find((p) => p.id === id) || null;
    setPost(foundPost);
  }, [id]);

  const handleLike = () => {
    if (!post) return;

    const posts = getPosts();
    const updatedPosts = posts.map((p) =>
      p.id === post.id ? { ...p, likes: p.likes + 1 } : p
    );

    savePosts(updatedPosts);

    const updatedPost = updatedPosts.find((p) => p.id === post.id) || null;
    setPost(updatedPost);
  };

  const handleComment = () => {
    if (!post || !commentContent.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      content: commentContent,
      author: "익명",
      createdAt: new Date().toISOString(),
    };

    const updatedPost = {
      ...post,
      comments: [...post.comments, newComment],
    };

    const posts = getPosts();
    const updatedPosts = posts.map((p) =>
      p.id === post.id ? updatedPost : p
    );

    savePosts(updatedPosts);
    setPost(updatedPost);
    setCommentContent("");
  };

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h1>게시글 상세</h1>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>작성자: {post.author}</p>
      <p>작성일: {new Date(post.createdAt).toLocaleString()}</p>

      <button onClick={handleLike}>좋아요</button>
      <p>좋아요 수: {post.likes}</p>

      <h3>댓글</h3>
      <div>
        {post.comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      <textarea
        placeholder="댓글을 입력하세요"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <button onClick={handleComment}>댓글 작성</button>
    </div>
  );
}