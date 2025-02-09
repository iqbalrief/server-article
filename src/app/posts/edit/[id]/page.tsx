'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Post = {
  id: number;
  title: string;
  category: string;
  content: string;
};

const EditPostPage = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/article/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
          setTitle(data.Title);
          setContent(data.Content);
          setCategory(data.Category);
        } else {
          console.error('Failed to fetch post data');
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/article/${id}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          category,
          status: 'draft'
        }),
      });

      if (response.ok) {
        router.push('/');
      } else {
        console.error('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleSaveAsDraft = async () => {
    await handleUpdate();
  };

  if (!post) {
    return <div className="p-4">Loading or post not found...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleSaveAsDraft}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Save as Draft
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostPage;
