import BlogList from 'components/BlogList/BlogList';
import Navigation from 'components/Navigation/Navigation';
import React from 'react';

const BlogPage: React.FC = () => {
  return (
    <>
      <Navigation />
      <BlogList />
    </>
  );
};

export default BlogPage;
