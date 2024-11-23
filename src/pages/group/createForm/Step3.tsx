import React from 'react';
import '../GroupForm.css';
import styles from './Step3.module.css';
import { FormData } from '../../../types';

interface Step3Props {
  nextStep: () => void;
  prevStep: () => void;
  handleChange: (input: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: FormData;
}

const Step3: React.FC<Step3Props> = ({
  nextStep,
  prevStep,
  handleChange,
  formData,
  handleFileChange,
}) => {
  return (
    <>
      <div>
        <h2 className={styles.title333}>모임활동 장소를 정해주세요</h2>
        <div className={styles.imageUpload}>
          <div className={styles.groupImage}>모임 사진 업로드</div>
          <input
            type="file"
            id="groupImage"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
          {formData.groupImage && (
            <div className={styles.imagePreview}>
              <img
                src={URL.createObjectURL(formData.groupImage)}
                alt="Group Preview"
                style={{ width: '100px' }}
              />
            </div>
          )}
        </div>
        <input
          type="text"
          placeholder="지역을 검색해주세요."
          onChange={handleChange('location')}
          value={formData.location}
          className={styles.inputField}
        />
        <div className={styles.buttonContainer}>
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

export default Step3;
