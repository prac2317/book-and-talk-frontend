import Header from '../../components/Header.tsx';
import BookCard from './BookCard.tsx';
import BookIntro from './BookIntro.tsx';
import GroupList from '../group/GroupList.tsx';
import GroupCount from '../group/GroupCount.tsx';
import styles from './book.module.css';
import { useParams } from 'react-router-dom';
import React, {createContext, useEffect, useState} from 'react';
import GroupCreateButton from '../group/GroupCreateButton.tsx';
import ky from "ky";

export const IsbnContext = createContext('');

interface Book {
  title: string;
  author: string;
  thumbnailUrl: string;
  date: string;
  publication: string;
  isbn13: string;
}

interface isLiked {
  isLiked: boolean;
}

const BookDetail = () => {
  const { isbn } = useParams();
  const [book, setBook] = useState<Book | null>(null); // 책 정보 상태 추가
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    // isbn을 통해 책 상세 검색
    const fetchBookDetails = async () => {
      if (!isbn) return;

      try {
        const kakaoResponse = await ky.get(
            `https://dapi.kakao.com/v3/search/book?target=isbn&query=${isbn}`,
            {
              headers: { Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}` },
            }
        ).json<{ documents: { title: string; authors: string[]; thumbnail: string; publisher: string; datetime: string, isbn: string }[] }>();

        if (kakaoResponse.documents.length > 0) {
          const kakaoBook = kakaoResponse.documents[0];
          const isbn13 = kakaoBook.isbn.match(/\b\d{13}\b/)?.[0] || ''; // isbn13 추출 -> 13자리 수

          setBook({
            title: kakaoBook.title,
            author: kakaoBook.authors.join(', '),
            thumbnailUrl: kakaoBook.thumbnail,
            date: new Date(kakaoBook.datetime).toLocaleDateString(),
            publication: kakaoBook.publisher,
            isbn13: isbn13,
          });
        }
      } catch (error) {
        console.error('Failed to fetch book details', error);
      }
    };

    fetchBookDetails();
;  }, [isbn]);

  const toggleLike = async () => {
    try {
      const response: isLiked = await ky.post(`${import.meta.env.VITE_BASE_URL}/api/book/like`, {
        json: {
          bookTitle: book?.title,
          author:book?.author,
          thumbnail: book?.thumbnailUrl,
          publishDate: book?.date,
          publication: book?.publication,
          isbn13: book?.isbn13
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      }).json();
      const result = response.isLiked;
      console.log(result);
      if (result === true) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
      // setGroupData((prevData) =>
      //     prevData ? { ...prevData, like: response.isLiked } : prevData
      // );
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  return (
    <IsbnContext.Provider value={isbn as string}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Header />
        </header>
        <main className={styles.main}>
          <section className={styles.bookSection}>
            {book ? <BookCard book={book} /> : <p>책 정보를 불러오고 있습니다 </p>}
            <BookIntro />
            <button onClick={toggleLike}>{isLiked ? '❤️' : '🤍'}</button>
          </section>
          <section className={styles.listSection}>
            <div className={styles.listHeader}>
              <GroupCount />
              <GroupCreateButton book={book} />
            </div>
            <GroupList />
          </section>
        </main>
      </div>
    </IsbnContext.Provider>
  );
};

export default BookDetail;
