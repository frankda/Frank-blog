import React, { useState } from 'react'
import {Button} from "antd";
import { UploadOutlined } from '@ant-design/icons';

export interface FileUpload {
    fileName: string,
    file: File
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

    // ref
    const fileInput = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files[0] ) {
            let file = e.currentTarget.files[0];
            setFormValues({
                ...formValues,
                file,
                fileName: file.name
            })
        }
    }

    const validate = () => {
        let validator = {} as FormValidation;
        validator.fileName = formValues.fileName == '' ? false : true;
        setErrors(validator);
        return Object.values(validator).every(v => v == true)
    }

    // TODO: this reset form function doesn't work
    const resetForm = () => {
        setFormValues({} as FileUpload);
        if (fileInput.current) {
            fileInput.current.files = null;
        }
        setErrors({} as FormValidation);
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(validate()) {
            const formData = new FormData();
            formData.append('file', formValues.file);
            formData.append('fileName', formValues.fileName);
            addOrEdit(formData, resetForm);
        }
    }

    const applyErrorClass = (field: (keyof FormValidation)) => {
        if (field in errors && errors[field] === false) {
            return ' invalid-field'
        } else {
            return ''
        }
    }

    return (
        <>
            <div className="container text-center">
                <h4>Upload blog</h4>
            </div>
            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="card">
                    <div className="card-body">
                        <div className="form-group mb-2">
                            <input type="file" name="file" ref={fileInput} id="file-uploader" className={"form-control-file" + applyErrorClass('fileName')} onChange={handleFileChange} />
                            <Button>
                                <UploadOutlined /> Upload file
                            </Button>
                        </div>
                        <div className="form-group">
                            <Button type="primary">Submit</Button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
