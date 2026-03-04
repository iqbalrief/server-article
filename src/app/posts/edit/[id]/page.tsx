'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/config';

type Post = {
  ID: number;
  Title: string;
  Category: string;
  Content: string;
};

const EditPostPage = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/article/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
          setTitle(data.Title);
          setContent(data.Content);
          setCategory(data.Category);
          setStatus(data.Status);
        } else {
          console.error('Failed to fetch post data');
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    if (id) fetchPost();
  }, [id]);

  const handleUpdate = async (newStatus?: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/article/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category, status: newStatus ?? status }),
      });

      if (response.ok) {
        router.push('/');
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!post) {
    return <div className="p-4">Loading or post not found...</div>;
  }

  const inputClass = "w-full p-2 border rounded bg-[var(--background)] text-[var(--foreground)] border-gray-300 dark:border-gray-600";

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>

      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold text-red-600 mb-2">Error</h2>
            <p className="text-gray-700 mb-4">{error}</p>
            <button
              onClick={() => setError(null)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => handleUpdate()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => handleUpdate('draft')}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => handleUpdate('publish')}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostPage;