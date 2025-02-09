import { useRouter } from 'next/router';

type Post = {
  id: number;
  title: string;
  category: string;
  content: string;
};

const posts: Post[] = [
  { id: 1, title: 'First Post', category: 'Tech', content: 'This is the content of the first post.' },
  { id: 2, title: 'Second Post', category: 'Life', content: 'This is the content of the second post.' },
  { id: 3, title: 'Third Post', category: 'Travel', content: 'This is the content of the third post.' },
];

const PostDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return <div className="p-4">Post not found.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">Category: {post.category}</p>
      <p className="text-gray-800">{post.content}</p>
    </div>
  );
};

export default PostDetailPage;