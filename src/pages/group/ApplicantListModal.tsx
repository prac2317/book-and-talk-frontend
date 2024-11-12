// ApplicantListModal.tsx
import React, { useState } from 'react';
import styles from './ApplicantListModal.module.css';

interface Applicant {
  id: number;
  applicationId: number;
  nickname: string;
  createdAt: string;
  questionAnswer: string;
  profileImageUrl: string | null;
}

interface ApplicantListModalProps {
  applicants: applicantData;
  onClose: () => void;
}

interface applicantData {
  data: Applicant[];
}

const ApplicantListModal: React.FC<ApplicantListModalProps> = ({ applicants, onClose }) => {
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  const handleApplicantClick = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
  };

  const handleAccept = () => {
    // TODO: 수락 로직 구현 (예: API 호출)
    onClose();
  };

  const handleReject = () => {
    // TODO: 거절 로직 구현 (예: API 호출)
    onClose();
  };

  const handleBackToList = () => {
    setSelectedApplicant(null);
  };

  // 나중에 수정하기
  const applicantList: Applicant[] = applicants.data;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {!selectedApplicant ? (
          <>
            <h4>신청자 명단</h4>
            {applicantList.length > 0 ? (
              <ul className={styles.applicantList}>
                {applicantList.map((applicant) => (
                  <li
                    key={applicant.id}
                    className={styles.applicantItem}
                    onClick={() => handleApplicantClick(applicant)}
                  >
                    <img
                      src={applicant.profileImageUrl || '/default-profile.png'}
                      alt={applicant.nickname}
                      className={styles.profileImage}
                    />
                    <span>{applicant.nickname}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noApplicants}>신청자가 없습니다.</p>
            )}
          </>
        ) : (
          <>
            <button className={styles.backButton} onClick={handleBackToList}>
              &larr; 목록으로
            </button>
            <div className={styles.applicantDetail}>
              <img
                src={selectedApplicant.profileImageUrl || '/default-profile.png'}
                alt={selectedApplicant.nickname}
                className={styles.profileImageLarge}
              />
              <h5>닉네임: {selectedApplicant.nickname}</h5>
              <p>소개: {selectedApplicant.questionAnswer || '소개가 없습니다.'}</p>
              <div className={styles.actionButtons}>
                <button className={styles.acceptButton} onClick={handleAccept}>
                  수락
                </button>
                <button className={styles.rejectButton} onClick={handleReject}>
                  거절
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicantListModal;
