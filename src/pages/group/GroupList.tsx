import { useContext, useEffect, useState } from 'react';
import GroupCard from './GroupCard.tsx';
import styles from './group.module.css';
import { getGroupList } from '../../api/getGroupList.ts';
import { Group } from '../../types/index.ts';
import { IsbnContext } from '../book/BookDetail.tsx';

const GroupList = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const isbn  = useContext(IsbnContext);

  useEffect(() => {
    const fetchGroups = async (isbn: string): Promise<void> => {
      try {
        const { totalCount, data } = await getGroupList(isbn);
        setGroups(data);
        setTotalCount(totalCount);
      } catch (error) {
        console.error('Failed to fetch groups:', error);
      }
    };

    fetchGroups(isbn);
  }, [isbn]);

  return (
    <div className={styles.list}>
      <h2>{totalCount}</h2>
      {groups.map((group) => (
        <GroupCard key={group.groupId} group={group} />
      ))}
    </div>
  );
};

export default GroupList;
