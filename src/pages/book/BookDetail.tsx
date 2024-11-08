import Header from '../../components/Header.tsx';
import BookCard from './BookCard.tsx';
import BookIntro from './BookIntro.tsx';
import GroupList from '../group/GroupList.tsx';
import GroupCount from '../group/GroupCount.tsx';
import styles from './book.module.css';
import { useParams } from 'react-router-dom';
import { createContext } from 'react';
import GroupCreateButton from '../group/GroupCreateButton.tsx';

const IsbnContext = createContext('');

const BookDetail = () => {
  const { isbn } = useParams();

  return (
    <IsbnContext.Provider value={isbn}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Header />
        </header>
        <main className={styles.main}>
          <section className={styles.bookSection}>
            <BookCard />
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
