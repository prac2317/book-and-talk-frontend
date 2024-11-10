import styles from './group.module.css';
import { Group } from '../../types/index.ts';
import {useNavigate} from "react-router-dom";

type Props = {
  group: Group;
};

const GroupCard = ({ group }: Props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/groups/${group.groupId}`)
    }

  return (
    <div className={styles.card} onClick={handleClick}>
      <section className={styles.imageSection}>
        <img src="" alt={group.name} />
      </section>
      <section className={styles.groupInfoSection}>
        <div>{group.name}</div>
        <div>{group.status}</div>
      </section>
    </div>
  );
};

export default GroupCard;
