import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import ky from 'ky';
import styles from './GroupDetail.module.css';
import ApplicantListModal from "./ApplicantListModal.tsx";

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

interface Applicant {
    id: number;
    applicationId: number;
    nickname: string;
    createdAt: string;
    questionAnswer: string;
    profileImageUrl: string;
}

interface applicantData {
    data: Applicant[];
}

const GroupDetail: React.FC = () => {
    const { groupId } = useParams<{ groupId: string }>();
    const [groupData, setGroupData] = useState<GroupDetailData | null>(null);
    const [applicants, setApplicants] = useState<applicantData>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

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

    const handleApplicantListClick = async () => {
        try {
            const applicantData: applicantData = await ky.get(`${import.meta.env.VITE_BASE_URL}/api/application`, {
                searchParams: { groupId },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
            }).json();
            setApplicants(applicantData);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Failed to fetch applicant list:', error);
        }
    };

    if (!groupData) return <p>Loading...</p>;

    const { overview, groupDescription, isParticipant, like } = groupData;

    const handleApplyClick = () => {
        const groupName = overview?.name;
        navigate('/applyform', { state: { groupId, groupName } });
    };

    return (
        <>
            <img src="../../../public/icon/Group-image.jpg" alt="그룹 이미지" className={styles.headerImage}/>
            <div className={styles.container}>
                <div className={styles.header}>
                    <button onClick={() => navigate(-1)}>뒤로가기</button>
                    <div className={styles.headerIcons}>
                        {isParticipant === "HOST" ? (
                            <>
                                <button>삭제</button>
                                <button>수정</button>
                            </>
                        ) : (
                            <button>좋아요</button>
                        )}
                    </div>
                </div>
                <div className={styles.groupNameBox}>{overview?.name}</div>

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
                        <img src="../../../public/icon/Map-example.png" alt="map"/>
                    </div>
                </section>

                <div className={styles.footerButtons}>
                    {isParticipant === "HOST" && <button className={styles.button} onClick={handleApplicantListClick}>신청자 목록</button>}
                    {isParticipant === "PARTICIPANT" && <button className={styles.button}>채팅하러 가기</button>}
                    {isParticipant === "APPLIED" && <button className={styles.button}>신청 취소</button>}
                    {(!isParticipant || isParticipant === "NONE") && (
                        <button className={styles.button}  onClick={handleApplyClick}>가입 신청</button>
                    )}
                </div>
            </div>
            {isModalOpen && <ApplicantListModal applicants={applicants} onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

export default GroupDetail;
