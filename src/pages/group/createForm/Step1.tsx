// Step1.tsx
import React from 'react';
import "../GroupForm.css";
import "./Step1.css";

interface Book {
    title: string;
    author: string;
    thumbnailUrl: string;
    date: string;
    publication: string;
    isbn13: string;
}

interface Step1Props {
    nextStep: () => void;
    book: Book | null;
}

const Step1: React.FC<Step1Props> = ({ nextStep, book }) => {
    return (
        <div className="step-container">
            <h2>이 책의 모임을 만들까요?</h2>
            {book && (
                <div className="book-info">
                    <img src={book.thumbnailUrl} alt={book.title} />
                    <div className="book-details">
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                        <p>{book.date}</p>
                        <p>{book.publication}</p>
                    </div>
                </div>
            )}
            <button className="next-button" onClick={nextStep}>
                다음
            </button>
        </div>
    );
};

export default Step1;
