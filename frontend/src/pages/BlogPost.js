import React from 'react';
import SEO from '../components/common/SEO';

const BlogPost = () => {
  return (
    <>
      <SEO title="Article de Blog" />
      <div className="pt-24 pb-12 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-heading font-bold mb-8 dark:text-white">Article de Blog</h1>
          <p className="dark:text-gray-400">Page en construction...</p>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
