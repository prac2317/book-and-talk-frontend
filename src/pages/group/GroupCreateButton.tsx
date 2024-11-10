import { useNavigate } from 'react-router-dom';
import styles from './group.module.css';

interface Book {
  title: string;
  author: string;
  thumbnailUrl: string;
  date: string;
  publication: string;
  isbn13: string;
}

interface GroupCreateButtonProps {
  book: Book | null; // book prop 추가
}

const GroupCreateButton: React.FC<GroupCreateButtonProps> = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/groups/new', { state: { book } });
  };
  return (
    <button className={styles.createButton} onClick={handleClick}>
      모임 만들기
    </button>
  );
};

export default GroupCreateButton;
