import styles from './group.module.css';
import { Group } from '../../types/index.ts';

type Props = {
  group: Group;
};

const GroupCard = ({ group }: Props) => {
  return (
    <div className={styles.card}>
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
