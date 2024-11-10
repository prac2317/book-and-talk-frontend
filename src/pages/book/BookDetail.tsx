import Header from '../../components/Header.tsx';
import BookCard from './BookCard.tsx';
import BookIntro from './BookIntro.tsx';
import GroupList from '../group/GroupList.tsx';
import GroupCount from '../group/GroupCount.tsx';
import styles from './book.module.css';
import { useParams } from 'react-router-dom';
import {createContext, useEffect, useState} from 'react';
import GroupCreateButton from '../group/GroupCreateButton.tsx';
import ky from "ky";

export const IsbnContext = createContext('');

interface Book {
  title: string;
  author: string;
  thumbnailUrl: string;
  date: string;
  publication: string;
}

const BookDetail = () => {
  const { isbn } = useParams();
  const [book, setBook] = useState<Book | null>(null); // 책 정보 상태 추가

  useEffect(() => {
    // isbn을 통해 책 상세 검색
    const fetchBookDetails = async () => {
      if (!isbn) return;

      try {
        const kakaoResponse = await ky.get(
            `https://dapi.kakao.com/v3/search/book?target=isbn&query=${isbn}`,
            {
              headers: { Authorization: 'KakaoAK 7b6213bdc6df67c5716661bf058d0763' },
            }
        ).json<{ documents: { title: string; authors: string[]; thumbnail: string; publisher: string; datetime: string }[] }>();

        if (kakaoResponse.documents.length > 0) {
          const kakaoBook = kakaoResponse.documents[0];
          setBook({
            title: kakaoBook.title,
            author: kakaoBook.authors.join(', '),
            thumbnailUrl: kakaoBook.thumbnail,
            date: new Date(kakaoBook.datetime).toLocaleDateString(),
            publication: kakaoBook.publisher,
          });
        }
      } catch (error) {
        console.error('Failed to fetch book details', error);
      }
    };

    fetchBookDetails();
  }, [isbn]);

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
            </section>
            <section className={styles.listSection}>
              <div className={styles.listHeader}>
                <GroupCount />
                <GroupCreateButton />
              </div>
              <GroupList />
            </section>
          </main>
        </div>
      </IsbnContext.Provider>
  );
};

export default BookDetail;
