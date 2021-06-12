import BlogList from 'components/BlogList/BlogList';
import Navigation from 'components/Navigation/Navigation';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BlogPage: React.FC = () => {
  return (
    <>
      <Navigation />
      <BlogList />
      <FontAwesomeIcon icon="coffee" />
    </>
  );
};

export default BlogPage;
