import axios from "axios";

import type { Post } from "@/types/post";

export interface PostListItem extends Omit<Post, "comments"> {
  commentCount: number;
}

export interface CreatePostData {
  title: string;
  content: string;
  author: string;
}

export interface CreateCommentData {
  content: string;
  author: string;
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchPosts(): Promise<PostListItem[]> {
  const response = await api.get<PostListItem[]>("/posts");
  return response.data;
}

export async function fetchPost(id: string): Promise<Post> {
  const response = await api.get<Post>(`/posts/${id}`);
  return response.data;
}

export async function createPost(data: CreatePostData): Promise<Post> {
  const response = await api.post<Post>("/posts", data);
  return response.data;
}

export async function deletePost(id: string): Promise<void> {
  await api.delete(`/posts/${id}`);
}

export async function toggleLike(id: string): Promise<Post> {
  const response = await api.patch<Post>(`/posts/${id}/like`);
  return response.data;
}

export async function createComment(
  postId: string,
  data: CreateCommentData
): Promise<Post> {
  const response = await api.post<Post>(`/posts/${postId}/comments`, data);
  return response.data;
}

export async function deleteComment(commentId: string): Promise<void> {
  await api.delete(`/comments/${commentId}`);
}
