// Step1.tsx
import React from 'react';
import '../GroupForm.css';
import styles from './Step1.module.css';

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
    <>
      <div>
        {book && (
          <div className={styles.bookInfo}>
            {/* <span className=closeBtn>&times;</span> */}
            <h2 className={styles.title}>이 책의 모임을 만들까요?</h2>
            <img src={book.thumbnailUrl} alt={book.title} className={styles.bookImage} />
            <div className={styles.bookDetails}>
              <h3>{book.title}</h3>
              <p>
                {book.author} 저 | {book.publication}
              </p>
              {/* <p>{book.date}</p> */}
            </div>
            <button className={styles.nextButton123} onClick={nextStep}>
              다음
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Step1;
