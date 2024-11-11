import React, { useState } from 'react';
import ky from 'ky';
import "./ApplyForm.css";

type ApplyRequest = {
    questionAnswer: string;
    groupId: number;
};

const ApplyForm: React.FC = () => {
    const [questionAnswer, setQuestionAnswer] = useState('');
    const [submissionMessage, setSubmissionMessage] = useState('');
    const maxCharCount = 200;

    const handleSubmit = async () => {
        try {
            const groupId = 1; // Replace with actual groupId or fetch dynamically
            const data: ApplyRequest = { questionAnswer, groupId };

            await ky.post(`${import.meta.env.VITE_BASE_URL}/application/apply`, {
                json: data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            setSubmissionMessage('참가 신청이 완료되었습니다.');
        } catch (error) {
            setSubmissionMessage('신청 중 오류가 발생했습니다.' + error);
        }
    };

    return (
      <div className="container">
        <div className="header">
          <span className="close-btn">&times;</span>
        </div>
        <div className="contents">
          <div className="introduction">
            <h1>호스트의 질문에 답변해주세요</h1>
            <p>답변은 호스트와 운영자에게만 공개됩니다.</p>
          </div>
          <div className="group-info">
            <div className="section-title">가입 신청한 독클럽명</div>
            <div className="input-field">북토피아 북클럽</div>
          </div>
          <div className="group-question">
            <p>저희 모임은 책을 읽고 독후감을 작성하는 모임입니다. </p>
            <p>기간동안 잘 참여하실 수 있는 분이시라면 좋겠습니다.</p>
            <textarea
              className="input-field"
              rows={4}
              maxLength={maxCharCount}
              placeholder="호스트의 질문에 대한 답변을 적어주세요."
              value={questionAnswer}
              onChange={(e) => setQuestionAnswer(e.target.value)}
            />
            <div className="character-count">
              {questionAnswer.length}/{maxCharCount}
            </div>
          </div>
        </div>

        <div className="warning-container">
            <div className="warning">
                <div className="warning-icon">⚠️</div>
                <div>주의해주세요!</div>
            </div>

          <div className="warning-text">
            전화번호, 카카오톡 아이디 등 과도한 개인정보를 묻는 경우, 가이드라인 위반 모임이므로
            신고해주세요.
          </div>
        </div>

        <button className="button" onClick={handleSubmit}>
          다음
        </button>

        {submissionMessage && <p className="submission-message">{submissionMessage}</p>}
      </div>
    );
};

export default ApplyForm;
