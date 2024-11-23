import React from 'react';
import '../GroupForm.css';
import styles from './Step2.module.css';
import { FormData } from '../../../types';

interface Step2Props {
  nextStep: () => void;
  prevStep: () => void;
  handleChange: (
    input: keyof FormData,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  formData: FormData;
}

const Step2: React.FC<Step2Props> = ({ nextStep, prevStep, handleChange, formData }) => {
  return (
    <>
      <div>
        {/* <span className="closeBtn22">&times;</span> */}
        <h2 className={styles.title2}>모임을 소개해주세요</h2>
        <input
          type="text"
          placeholder="북클럽명을 정해주세요."
          onChange={handleChange('name')}
          value={formData.name}
          maxLength={15}
          className={styles.inputField}
        />
        <textarea
          placeholder="모임을 소개해주세요. 모임 설정에서 수정할 수 있어요."
          onChange={handleChange('groupDescription')}
          value={formData.groupDescription}
          maxLength={500}
          className={styles.textareaField}
        />
        <div className="button-container">
          <button className={styles.prevButton} onClick={prevStep}>
            이전
          </button>
          <button className={styles.nextButton} onClick={nextStep}>
            다음
          </button>
        </div>
      </div>
    </>
  );
};

export default Step2;
