'use client';

import { API_BASE_URL } from '@/config';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Post = {
  ID: number;
  Title: string;
  Category: string;
  Content: string;
};

const PostDetailPage = () => {
  const params = useParams();
  const id = params?.id;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("params:", params);
  console.log("id:", id);
    if (id) {
      const fetchPost = async () => {
        try {
          setLoading(true);
          const response = await fetch(`${API_BASE_URL}/article/${id}`);
          if (!response.ok) {
            throw new Error('Post not found');
          }
          const data = await response.json();
          setPost(data); 
        } catch (error) {
          setError('Failed to fetch post');
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
    }
  }, [id]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!post) {
    return <div className="p-4">Post not found...</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Post Detail</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <div className="text-lg font-semibold text-gray-900">{post.Title}</div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <div className="text-lg font-semibold text-gray-900">{post.Category}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <div className="text-lg text-gray-900 whitespace-pre-line">{post.Content}</div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;