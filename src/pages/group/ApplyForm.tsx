import React, { useState } from 'react';
import ky from 'ky';
import styles from './ApplyForm.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

type ApplyRequest = {
  questionAnswer: string;
  groupId: number;
};

const ApplyForm: React.FC = () => {
  const navigate = useNavigate();
  const [questionAnswer, setQuestionAnswer] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const maxCharCount = 200;

  const location = useLocation();
  const { groupId, groupName } = location.state || {};

  const handleSubmit = async () => {
    try {
      const data: ApplyRequest = { questionAnswer, groupId };

      await ky.post(`${import.meta.env.VITE_BASE_URL}/api/application/apply`, {
        json: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setSubmissionMessage('참가 신청이 완료되었습니다.');
      navigate('/apply-success', { state: { groupId } });
      console.log(submissionMessage);
    } catch (error) {
      setSubmissionMessage('신청 중 오류가 발생했습니다.' + error);
      console.log(submissionMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.closeBtn}>&times;</span>
      </div>
      <div className={styles.contents}>
        <div className={styles.instroduction}>
          <h1>호스트의 질문에 답변해주세요</h1>
          <p>답변은 호스트와 운영자에게만 공개됩니다.</p>
        </div>
        <div className={styles.groupInfo}>
          <div className={styles.sectionTitle}>가입 신청한 모임 이름</div>
          <div className={styles.titleInput}>{groupName}</div>
        </div>
        <div className={styles.groupQuestion}>
          <p>저희 모임은 책을 읽고 독후감을 작성하는 모임입니다. </p>
          <p>기간동안 잘 참여하실 수 있는 분이시라면 좋겠습니다.</p>
          <textarea
            className={styles.questionInput}
            rows={4}
            maxLength={maxCharCount}
            placeholder="호스트의 질문에 대한 답변을 적어주세요."
            value={questionAnswer}
            onChange={(e) => setQuestionAnswer(e.target.value)}
          />
          <div className={styles.characterCount}>
            {questionAnswer.length}/{maxCharCount}
          </div>
        </div>
      </div>

      <div className={styles.warningContainer}>
        <div className={styles.warning}>
          <div className={styles.warningIcon}>⚠️</div>
          <div>주의해주세요!</div>
        </div>

        <div className={styles.warningTextBox}>
          <p>전화번호, 카카오톡 아이디 등 과도한 개인정보를 묻는 경우,</p>
          <p>가이드라인 위반 모임이므로 신고해주세요.</p>
        </div>
      </div>

      <button className={styles.button} onClick={handleSubmit}>
        다음
      </button>

      {/*{submissionMessage && <p className={styles.submissionMessage}>{submissionMessage}</p>}*/}
    </div>
  );
};

export default ApplyForm;
