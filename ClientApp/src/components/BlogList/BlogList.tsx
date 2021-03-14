import React from 'react';
import BlogUpload, { FileUpload } from '../BlogUpload/BlogUpload';
import axios from 'axios';

export default function BlogList() {
    const blogAPI = (url: string = 'https://localhost:44317/api/BlogModels') => {
        return {
            fetchAll: () => axios.get(url),
            create: (newRecord: FileUpload) => axios.post(url, newRecord),
            update: (id: number, updatedRecord: FileUpload) => axios.put(url + id, updatedRecord),
            delete: (id: number) => axios.delete(url + id)
        }
    }

    const addOrEdit = (formData: FileUpload, onSuccess: Function) => {
        blogAPI().create(formData)
        .then((res) => {
            onSuccess();
        })
        .catch((err) => console.error(err))
    }

    return (
        <div className="row">
            <div className="col-12 mb-4">
                <BlogUpload addOrEdit={addOrEdit} />
            </div>
            <div className="col-12">
                <h4 className="text-center">List of blogs</h4>
            </div>
        </div>
    )
}
