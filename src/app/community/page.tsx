"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPosts } from "@/lib/mockData";
import { Post } from "@/types/post";
import PostCard from "@/components/PostCard";

export default function CommunityPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[760px]">
        <div className="rounded-lg bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-6 py-6 sm:px-8">
            <div>
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                커뮤니티
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                최신 글을 확인하고 자유롭게 소통해 보세요.
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push("/community/write")}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
            >
              글 작성
            </button>
          </div>

          <div className="px-6 py-6 sm:px-8 sm:py-8">
            {posts.length === 0 ? (
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-sm text-gray-600">
                아직 게시글이 없습니다.
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}