import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ky from 'ky';
import styles from './GroupDetail.module.css';

interface GroupOverview {
    groupId: number;
    name: string;
    participants: number;
    maxParticipants: number;
    startDate: string;
    duration: number;
    createdAt: string;
    status: string;
    bookId: number;
    location: string | null;
    groupImage: string | null;
}

interface GroupDetailData {
    overview: GroupOverview;
    groupDescription: string;
    isParticipant: string;
    like: boolean;
}

const GroupDetail: React.FC = () => {
    const { groupId } = useParams<{ groupId: string }>();
    const [groupData, setGroupData] = useState<GroupDetailData | null>(null);

    useEffect(() => {
        const fetchGroupData = async () => {
            try {
                const data: GroupDetailData = await ky.get(`${import.meta.env.VITE_BASE_URL}/api/groups/${groupId}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                        },
                    }
                ).json();
                setGroupData(data);
            } catch (error) {
                console.error('Failed to fetch group details:', error);
            }
        };

        fetchGroupData();
    }, [groupId]);

    if (!groupData) return <p>Loading...</p>;

    const { overview, groupDescription, isParticipant, like } = groupData;

    return (
        <>
        <div className={styles.headerImage}>
        </div>
        <div className={styles.container}>
            <div className={styles.headerImage}
                 style={{backgroundImage: `url(${overview.groupImage || 'default-image-url'})`}}>
            </div>
            <div className={styles.groupNameBox}>{overview.name}</div>

            <section className={styles.overviewBox}>
                <h4>모임 개요</h4>
                <div className={styles.overviewDetail}>
                    <p>책: {overview.name}</p>
                    <p>날짜: {new Date(overview.startDate).toLocaleDateString()}</p>
                    <p>참여자: {overview.participants}/{overview.maxParticipants}</p>
                </div>
            </section>

            <section className={styles.introduceBox}>
                <h4>소개글</h4>
                <p className={styles.introduceDetail}>{groupDescription}</p>
            </section>

            <section className={styles.memberBox}>
                <div className={styles.member}>
                    <h4>참여 멤버</h4>
                    <span>{overview.participants}/{overview.maxParticipants}</span>
                </div>
                <div className={styles.memberDetail}>참여자 목록</div>
            </section>

            <section className={styles.mapBox}>
                <h4>지역</h4>
                <div className={styles.mapContainer}>
                    <img src="map-placeholder-url" alt="map"/>
                </div>
            </section>

            <div className={styles.footerButtons}>
                <button className={styles.button}>신청자 목록</button>
            </div>
        </div>
        </>
    );
};

export default GroupDetail;
