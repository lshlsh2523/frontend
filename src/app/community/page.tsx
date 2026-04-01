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
    <div>
      <h1>커뮤니티</h1>
      <button onClick={() => router.push("/community/write")}>글 작성</button>
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}