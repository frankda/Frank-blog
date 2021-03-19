import React, { useState } from 'react';
import { Button, Card, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './BlogUpload.scss';
import { UploadFile } from 'antd/lib/upload/interface';

export interface FileUpload {
    fileName: string,
    fileList: UploadFile[]
}

interface FormValidation {
    fileName: boolean,
}

interface IProps {
    addOrEdit: Function
}

const BlogUpload: React.FC<IProps> = (props: IProps) => {
	// props
	const { addOrEdit } = props;

	// state
	const [formValues, setFormValues] = useState<FileUpload>({} as FileUpload);
	const [errors, setErrors] = useState<FormValidation>({} as FormValidation);
	const [uploading, setUploading] = useState(false);
	const [showUploadList, setShowUploadList] = useState(true);

	const beforeUpload = (file: UploadFile) => {
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
		return Object.values(validator).every(v => v);
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setShowUploadList(true);
		if (validate()) {
			setUploading(true);
			const formData = new FormData();
			// @ts-ignore
			formData.append('file', formValues.fileList[0]);
			formData.append('fileName', formValues.fileName);
			addOrEdit(formData, () => {
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
