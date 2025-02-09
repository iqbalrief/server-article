const PreviewPage = () => {
    const posts = [
      { id: 1, title: 'First Post', content: 'This is the first post.', category: 'Tech' },
      { id: 2, title: 'Second Post', content: 'This is the second post.', category: 'Life' },
    ];
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Preview Posts</h1>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border p-4 rounded">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-600">{post.category}</p>
              <p className="mt-2">{post.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center space-x-2">
          <button className="px-4 py-2 bg-gray-200 rounded">Previous</button>
          <button className="px-4 py-2 bg-gray-200 rounded">Next</button>
        </div>
      </div>
    );
  };
  
  export default PreviewPage;