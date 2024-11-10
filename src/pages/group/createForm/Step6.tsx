// Step6.tsx
import React from 'react';
import "../GroupForm.css";
import "./Step6.css";
import { FormData } from "../../../types";
import ky from 'ky';
import {useNavigate} from "react-router-dom";

interface Book {
    title: string;
    author: string;
    thumbnailUrl: string;
    date: string;
    publication: string;
    isbn13: string;
}

interface Step6Props {
    prevStep: () => void;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    book: Book | null;
}

const Step6: React.FC<Step6Props> = ({ prevStep, formData, setFormData, book }) => {
    const navigate = useNavigate();

    const submitForm = async () => {
        try {
            if (book) {
                const bookResponse = await ky.post(`${import.meta.env.VITE_BASE_URL}/api/create-book`, {
                    json: {
                        isbn13: book.isbn13,
                        thumbnail: book.thumbnailUrl,
                        bookTitle: book.title
                    },
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json',
                    },
                }).json<{ bookId: number }>();

                const bookId = bookResponse.bookId;
                setFormData((prevFormData) => ({ ...prevFormData, bookId }));

                const groupResponse = await ky.post(`${import.meta.env.VITE_BASE_URL}/api/groups/new`, {
                    json: { ...formData, bookId },
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (groupResponse.ok) {
                    console.log('모임이 성공적으로 생성되었습니다.');
                    navigate(`/books/${book.isbn13}`);
                }
            }
        } catch (error) {
            console.error('모임 생성 중 오류 발생:', error);
        }
    };

    return (
        <div className="step-container">
            <h2>모임 생성이 완료되었습니다</h2>
            <button className="prev-button" onClick={prevStep}>이전</button>
            <button className="complete-button" onClick={submitForm}>완료</button>
        </div>
    );
};

export default Step6;
