import React from 'react';
import '../GroupForm.css';
import styles from './Step4.module.css';
import { FormData } from '../../../types';

interface Step4Props {
  nextStep: () => void;
  prevStep: () => void;
  handleChange: (input: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: FormData;
}

const Step4: React.FC<Step4Props> = ({ nextStep, prevStep, handleChange, formData }) => {
  const selectDuration = (days: number) => {
    handleChange('duration')({ target: { value: days } } as React.ChangeEvent<HTMLInputElement>);
    console.log(days);
  };

  // @ts-ignore
    return (
    <div>
      <h2>모임활동 시작 날짜를 정해주세요</h2>
      <input
        type="date"
        onChange={handleChange('startDate')}
        value={formData.startDate}
        className={styles.inputField}
      />
      <h2>모집기간을 정해주세요</h2>
      <div className={styles.durationOptions}>
        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
          <button
            key={day}
            onClick={() => selectDuration(day)}
            className={`${formData.duration === day ? styles.durationButtonActive : styles.durationButton}`}
          >
            {day}일
          </button>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.prevButton} onClick={prevStep}>
          이전
        </button>
        <button className={styles.nextButton} onClick={nextStep}>
          다음
        </button>
      </div>
    </div>
  );
};

export default Step4;
