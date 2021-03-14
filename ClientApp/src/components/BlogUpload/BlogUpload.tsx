import React, { useState } from 'react'
import {Button, Card, Upload} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import './BlogUpload.scss';
import { UploadFile } from 'antd/lib/upload/interface';

export interface FileUpload {
    fileName: string,
    fileList: File[]
}

interface FormValidation {
    fileName: Boolean,
}

interface IProps {
    addOrEdit: Function
}

export default function BlogUpload(props: IProps) {
    // props
    const { addOrEdit } = props;

    // state
    const [formValues, setFormValues] = useState<FileUpload>({} as FileUpload);
    const [errors, setErrors] = useState<FormValidation>({} as FormValidation);
    const [uploading, setUploading] = useState(false);
    const [showUploadList, setShowUploadList] = useState(true)
    const [fileList, setFileList] = useState([] as UploadFile[])

    const beforeUpload = (file: any) => {
        // TODO: refactor tem
        const tem = [] as File[];
        tem.push(file);
        setFormValues({
            // ...formValues,
            fileList: tem,
            fileName: file.name
        });
        setFileList([...fileList, file])

        return false;
    }

    const onRemove = () => {
        setFormValues({} as FileUpload);
        setErrors({} as FormValidation);
        setFileList([] as UploadFile[]);
    };

    const validate = () => {
        const validator = {} as FormValidation;
        validator.fileName = formValues.fileName === '' ? false : true;
        setErrors(validator);
        return Object.values(validator).every(v => v == true)
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowUploadList(true);
        if(validate()) {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', formValues.fileList[0]);
            // formData.append('files[]', formValues.fileList);
            formData.append('fileName', formValues.fileName);
            addOrEdit(formData, () => {
                onRemove();
                setUploading(false);
            });
        }
    }

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
                    fileList={fileList}
                >
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
                <Button
                    type={'primary'}                    
                    loading={uploading}
                    disabled={typeof formValues.fileList === 'undefined'}
                    onClick={handleFormSubmit}
                    className="fb-blog-upload__upload-btn" 
                >
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </Card>
        </>
    )
}
