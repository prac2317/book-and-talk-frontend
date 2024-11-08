import styles from './group.module.css';

const data = {
  count: 4,
};

const GroupCount = () => {
  return <div className={styles.header}>{`모임 목록 ${data.count}개`}</div>;
};

export default GroupCount;
