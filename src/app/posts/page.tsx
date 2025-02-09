'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddNewPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('draft');
  const router = useRouter();


  const sendPostData = async () => {
    const postData = {
      title,
      content,
      category,
      status,
    };

    try {
      const response = await fetch('http://localhost:3000/article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Post created:', data);
        
        router.push('/');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error sending post data:', error);
    }
  };

  
  const handlePublish = () => {
    setStatus('published');
    sendPostData();
  };

  
  const handleDraft = () => {
    setStatus('draft');
    sendPostData();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Post</h1>
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
            onClick={handlePublish}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Publish
          </button>
          <button
            type="button"
            onClick={handleDraft}
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
