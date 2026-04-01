"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getPosts, savePosts } from "@/lib/mockData";
import { Post } from "@/types/post";

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    const newPost: Post = {
      id: Date.now().toString(),
      title: title,
      content: content,
      author: "익명",
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    };

    const posts = getPosts();
    const updatedPosts = [...posts, newPost];
    savePosts(updatedPosts);
    router.push("/community");
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[760px]">
        <div className="rounded-lg bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-6 sm:px-8">
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
              글 작성
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              제목과 내용을 입력해 게시글을 작성하세요.
            </p>
          </div>

          <div className="space-y-5 px-6 py-6 sm:px-8 sm:py-8">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-700">
                제목
              </label>
              <input
                id="title"
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="content"
                className="text-sm font-medium text-gray-700"
              >
                내용
              </label>
              <textarea
                id="content"
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm leading-relaxed text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white"
              >
                작성
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}