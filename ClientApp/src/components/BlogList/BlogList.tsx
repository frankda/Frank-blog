import React from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import BlogUpload, { FileUpload } from '../BlogUpload/BlogUpload';

export default function BlogList() {
  const blogAPI = (url = 'https://localhost:44317/api/BlogModels') => ({
    fetchAll: () => axios.get(url),
    create: (newRecord: FileUpload) => axios.post(url, newRecord),
    update: (id: number, updatedRecord: FileUpload) => axios.put(url + id, updatedRecord),
    delete: (id: number) => axios.delete(url + id),
  });

  // eslint-disable-next-line @typescript-eslint/ban-types
  const addOrEdit = (formData: FileUpload, onSuccess: Function) => {
    blogAPI().create(formData)
      .then((res) => {
        onSuccess();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <Row>
        <Col span={24}>
          <BlogUpload addOrEdit={addOrEdit} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <h4 className="text-center">List of blogs</h4>
        </Col>
      </Row>
    </div>
  );
}
