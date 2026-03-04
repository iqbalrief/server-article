'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/config';

const AddNewPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const sendPostData = async (status: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/article`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category, status }),
      });

      if (response.ok) {
        router.push('/');
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      console.error('Error sending post data:', error);
    }
  };

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Add New Post</h1>

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
            className="w-full p-2 border rounded bg-[var(--background)] text-[var(--foreground)] border-gray-300 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded bg-[var(--background)] text-[var(--foreground)] border-gray-300 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded bg-[var(--background)] text-[var(--foreground)] border-gray-300 dark:border-gray-600"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => sendPostData('publish')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Publish
          </button>
          <button
            type="button"
            onClick={() => sendPostData('draft')}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Save as Draft
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewPage;