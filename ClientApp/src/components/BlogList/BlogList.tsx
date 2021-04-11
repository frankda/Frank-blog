import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import { FileUpload } from '../BlogUpload/BlogUpload';

interface IBlogList {
  id: number,
  fileName: string,
  fileSrc: string
}

export default function BlogList() {
  const [blogList, setBlogList] = useState([] as IBlogList[]);

  const blogAPI = (url = 'https://localhost:44317/api/BlogModels') => ({
    fetchAll: () => axios.get(url),
    create: (newRecord: FileUpload) => axios.post(url, newRecord),
    update: (id: number, updatedRecord: FileUpload) => axios.put(url + id, updatedRecord),
    delete: (id: number) => axios.delete(url + id),
  });

  const refreshBlogList = () => {
    blogAPI().fetchAll()
      .then((res) => setBlogList(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    refreshBlogList();
  }, []);

  const renderBlogList = () => (
    <>
      {blogList.map((blog) => (
        <h4 key={blog.id}>
          {blog.fileName}
        </h4>
      ))}
    </>
  );

  return (
    <div className="container">
      <Row>
        <Col span={24}>
          <h4 className="text-center">List of blogs</h4>
          {renderBlogList()}
        </Col>
      </Row>
    </div>
  );
}
