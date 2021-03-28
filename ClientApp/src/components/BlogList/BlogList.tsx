import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import { FileUpload } from '../BlogUpload/BlogUpload';

export default function BlogList() {
  const [blogList, setBlogList] = useState([]);

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
  }, [blogList]);

  return (
    <div className="container">
      <Row>
        <Col span={24}>
          <h4 className="text-center">List of blogs</h4>
        </Col>
      </Row>
    </div>
  );
}
