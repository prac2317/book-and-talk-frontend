import styles from './book.module.css';

// const book = {
//   title: '아주 작은 습관의 힘',
//   author: '제임스 클리어',
//   thumbnailUrl:
//     'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038',
//   date: new Date(2024, 10, 19).toLocaleDateString(),
//   publication: '비즈니스북스',
// };
interface Book {
    title: string;
    author: string;
    thumbnailUrl: string;
    date: string;
    publication: string;
}

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    return (
        <div className={styles.card}>
            <section className={styles.imageSection}>
                <img src={book.thumbnailUrl} alt={book.title} />
            </section>
            <section className={styles.bookInfoSection}>
                <h3>{book.title}</h3>
                <div>{book.author}</div>
                <div>{book.date}</div>
                <div>{book.publication}</div>
            </section>
        </div>
    );
};

export default BookCard;
