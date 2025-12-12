import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import Loading from '../components/common/Loading';
import { getBlogPosts } from '../services/apiService';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogPosts({ limit: 12 });
        setPosts(data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <SEO title="Blog IT & Informatique" />
      <div className="pt-24 pb-12 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-heading font-bold text-center mb-12 dark:text-white">
            Blog Informatique & IT
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post._id} to={`/blog/${post.slug}`} className="card hover:shadow-card-hover dark:bg-gray-800 dark:border-gray-700">
                <div className="mb-4">
                  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm dark:bg-primary/20">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">{post.title}</h3>
                <p className="text-gray-medium mb-4 dark:text-gray-400">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-medium dark:text-gray-400">
                  <span>{post.readTime} min de lecture</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR')}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
