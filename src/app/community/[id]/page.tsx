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
    return (
      <div className="min-h-screen bg-[#f5f7fa] px-4 py-12">
        <div className="mx-auto max-w-[760px]">
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-600 shadow-sm">
            게시글을 찾을 수 없습니다.
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[760px]">
        <article className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <h1 className="text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
              {post.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
              <span>{post.author}</span>
              <span className="text-gray-300" aria-hidden>
                ·
              </span>
              <time dateTime={post.createdAt}>{formattedDate}</time>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-8">
              <div className="whitespace-pre-wrap text-base leading-relaxed text-gray-800">
                {post.content}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleLike}
                className="inline-flex items-center rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white"
              >
                좋아요
              </button>
              <span className="text-sm text-gray-600">{post.likes}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 bg-gray-50/50 px-6 py-6 sm:px-8">
            <h2 className="text-base font-semibold text-gray-900">댓글</h2>

            <div className="mt-4">
              {post.comments.length === 0 ? (
                <p className="py-4 text-sm text-gray-500">아직 댓글이 없습니다.</p>
              ) : (
                <ul className="list-none divide-y divide-gray-200 rounded-md border border-gray-100 bg-white p-0">
                  {post.comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <label htmlFor="comment-input" className="sr-only">
                댓글 입력
              </label>
              <textarea
                id="comment-input"
                placeholder="댓글을 입력하세요"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                rows={4}
                className="w-full resize-y rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleComment}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                >
                  댓글 작성
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
