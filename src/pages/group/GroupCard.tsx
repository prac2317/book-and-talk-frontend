import styles from './group.module.css';

const group = {
  bookTitle: '아주 작은 습관의 힘',
  desc: '아주 작은 습관의 힘 같이 읽어요',
  img: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038',
};

const GroupCard = () => {
  return (
    <div className={styles.card}>
      <section className={styles.imageSection}>
        <img src="" alt={group.bookTitle} />
      </section>
      <section className={styles.groupInfoSection}>
        <div>{group.bookTitle}</div>
        <div>{group.desc}</div>
      </section>
    </div>
  );
};

export default GroupCard;
