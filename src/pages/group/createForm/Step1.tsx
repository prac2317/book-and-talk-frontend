import React from 'react';
import "../GroupForm.css";
import "./Step1.css"

interface Step1Props {
    nextStep: () => void;
}

const Step1: React.FC<Step1Props> = ({nextStep}) => {
    return (
      <div className="step-container">
        <h2>이 책의 모임을 만들까요?</h2>
        <div className="book-info">
          <img
            src="https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038"
            alt="아주 작은 습관의 힘"
          />
          <div className="book-details">
            <h3>아주 작은 습관의 힘</h3>
            <p>제임스 클리어</p>
            <p>2024년 10월 19일</p>
            <p>비즈니스북스</p>
          </div>
        </div>
        <button className="next-button" onClick={nextStep}>
          다음
        </button>
      </div>
    );
};




export default Step1;
