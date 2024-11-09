import { useContext, useEffect, useState } from 'react';
import GroupCard from './GroupCard.tsx';
import styles from './group.module.css';
import { getGroupList } from '../../api/getGroupList.ts';
import { Group } from '../../types/index.ts';
import { IsbnContext } from '../book/BookDetail.tsx';

const GroupList = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const { isbn } = useContext(IsbnContext);

  useEffect(() => {
    const fetchGroups = async (isbn): Promise<void> => {
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
