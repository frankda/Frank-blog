import React, { useState } from 'react';
import { Button, Card, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import axios from 'axios';

export interface FileUpload {
  fileName: string,
  fileList: UploadFile[] & Blob[]
}

interface FormValidation {
  fileName: boolean,
}

const BlogUpload: React.FC = () => {
  const [formValues, setFormValues] = useState<FileUpload>({} as FileUpload);
  const [errors, setErrors] = useState<FormValidation>({} as FormValidation);
  const [uploading, setUploading] = useState(false);
  const [showUploadList, setShowUploadList] = useState(true);

  const uploadBlog = (formData: FormData, onSuccess: () => any) => {
    axios.post('https://localhost:44317/api/BlogModels', formData)
      .then((res) => {
        onSuccess();
      })
      .catch((err) => console.error(err));
  };

  const beforeUpload = (file: UploadFile & Blob) => {
    setFormValues({
      fileList: [file],
      fileName: file.name,
    });

    return false;
  };

  const onRemove = () => {
    setFormValues({} as FileUpload);
    setErrors({} as FormValidation);
  };

  const validate = () => {
    const validator = {} as FormValidation;
    validator.fileName = formValues.fileName !== '';
    setErrors(validator);
    return Object.values(validator).every((v) => v);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowUploadList(true);
    if (validate()) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', formValues.fileList[0]);
      formData.append('fileName', formValues.fileName);
      uploadBlog(formData, () => {
        onRemove();
        setUploading(false);
      });
    }
  };

  return (
    <>
      <div className="container text-center">
        <h4>Upload blog</h4>
      </div>

      <Card>
        <Upload
          maxCount={1}
          beforeUpload={beforeUpload}
          onRemove={onRemove}
          showUploadList={showUploadList}
          fileList={formValues.fileList}
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        <Button
          type="primary"
          loading={uploading}
          disabled={typeof formValues.fileList === 'undefined'}
          onClick={handleFormSubmit}
          className="fb-blog-upload__upload-btn"
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </Card>
    </>
  );
};

export default BlogUpload;
