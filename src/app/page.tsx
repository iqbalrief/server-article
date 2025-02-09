'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Post = {
  id: number;
  title: string;
  category: string;
  status: string
};

const AllPostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'published' | 'draft' | 'trash'>('published'); // Lowercase active tab
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/article/${page}/10`);
        const data = await response.json();
        
    

        
        const formattedData = data.map((item: any) => ({
          id: item.id,
          title: item.Title,
          category: item.Category,
          status: item.Status.toLowerCase() as 'published' | 'draft' | 'trash',
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
     
      const response = await fetch(`http://localhost:3000/article/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'trash',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update article status');
      }

  
      const { status } = await response.json();

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id ? { ...post, status } : post
        )
      );
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  const filteredPosts = posts.filter((post) => post.status === activeTab);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {['published', 'draft', 'trash'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setActiveTab(tab as 'published' | 'draft' | 'trash')} 
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
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <tr key={post.id} className="border">
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

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
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
