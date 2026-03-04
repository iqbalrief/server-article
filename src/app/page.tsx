'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_BASE_URL } from '@/config';

type Post = {
  id: number;
  title: string;
  category: string;
  status: string;
};

const AllPostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'publish' | 'draft' | 'trash'>('publish');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/article`);
        const data = await response.json();

        const formattedData = data.map((item: any) => ({
          id: item.ID,
          title: item.Title,
          category: item.Category,
          status: item.Status.toLowerCase() as 'publish' | 'draft' | 'trash',
        }));

        setPosts(formattedData);
        setTotalPages(3);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [page]);

  const handleEdit = (id: number) => {
    router.push(`/posts/edit/${id}`);
  };

  const handleTrash = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/article/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to delete article');

      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const filteredPosts = posts.filter((post) => post.status === activeTab);

  return (
    <div className="p-4 min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {['publish', 'draft'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-100'}`}
              onClick={() => setActiveTab(tab as 'publish' | 'draft')}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <Link href="/posts">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Add New
          </button>
        </Link>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="p-2 border dark:border-gray-600">Title</th>
            <th className="p-2 border dark:border-gray-600">Category</th>
            <th className="p-2 border dark:border-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <tr key={post.id} className="border dark:border-gray-600">
                <td className="p-2">
                  <Link href={`/posts/${post.id}`}>
                    <span className="text-blue-500 hover:text-blue-700 cursor-pointer">
                      {post.title}
                    </span>
                  </Link>
                </td>
                <td className="p-2">{post.category}</td>
                <td className="p-2">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEdit(post.id)}
                  >
                    Edit
                  </button>
                  <button
                    className={`text-red-500 hover:text-red-700 ${activeTab === 'trash' ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={() => activeTab !== 'trash' && handleTrash(post.id)}
                  >
                    Trash
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center p-4">
                No posts found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-gray-100 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-gray-100 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllPostsPage;