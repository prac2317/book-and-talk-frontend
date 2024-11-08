import { useEffect, useState } from 'react';
import GroupCard from './GroupCard.tsx';
import styles from './group.module.css';
import { getGroupList } from '../../api/getGroupList.ts';
import { Group } from '../../types/index.ts';

type Props = {
  isbn: string;
};

const GroupList = ({ isbn }: Props) => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchGroups = async (isbn: string): Promise<void> => {
      try {
        const data: Group[] = await getGroupList(isbn);
        setGroups(data);
      } catch (error) {
        console.error('Failed to fetch groups:', error);
      }
    };

    fetchGroups(isbn);
  }, [isbn]);

  return (
    <div className={styles.list}>
      {groups.map((group) => (
        <GroupCard key={group.groupId} group={group} />
      ))}
    </div>
  );
};

export default GroupList;
