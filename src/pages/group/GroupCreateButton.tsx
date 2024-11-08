import { useNavigate } from 'react-router-dom';
import styles from './group.module.css';

const GroupCreateButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/groups/new');
  };
  return (
    <button className={styles.createButton} onClick={handleClick}>
      모임 만들기
    </button>
  );
};

export default GroupCreateButton;
