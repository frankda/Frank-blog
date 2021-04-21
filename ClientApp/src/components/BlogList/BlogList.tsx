import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileUpload } from '../BlogUpload/BlogUpload';
import './BlogList.scss';

interface IBlogList {
  id: number;
  fileName: string;
  fileSrc: string;
}

const fakeData: IBlogList[] = [
  { id: 0, fileName: 'first article', fileSrc: '' },
  { id: 1, fileName: 'second article', fileSrc: '' },
];

const BlogList: React.FunctionComponent = () => {
  const [blogList, setBlogList] = useState([] as IBlogList[]);

  const blogAPI = (url = 'https://localhost:44317/api/BlogModels') => ({
    fetchAll: () => axios.get(url),
    create: (newRecord: FileUpload) => axios.post(url, newRecord),
    update: (id: number, updatedRecord: FileUpload) => axios.put(url + id, updatedRecord),
    delete: (id: number) => axios.delete(url + id),
  });

  const refreshBlogList = () => {
    blogAPI()
      .fetchAll()
      .then((res) => setBlogList(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    refreshBlogList();
  }, []);

  const renderBlogList = (blogs: IBlogList[]) => (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div className="blog-list__blog-row" key={blog.id}>
          <time>Apr 06</time>
          <h3>{blog.fileName}</h3>
        </div>
      ))}
    </div>
  );

  return (

    <div className="container">
      <div className="row">
        <div className="col">
          {/* h2 can be category name */}
          <h2>Blogs</h2>
          {renderBlogList(fakeData)}
          {/* {renderBlogList(blogList)} */}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
