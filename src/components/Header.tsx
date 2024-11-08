import BackButton from './BackButton';
import styles from './header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <BackButton />
    </div>
  );
};

export default Header;
