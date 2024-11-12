import React from 'react';
import "../GroupForm.css";
import "./Step3.css"
import {FormData} from "../../../types";

interface Step3Props {
    nextStep: () => void;
    prevStep: () => void;
    handleChange: (input: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: FormData;
}

const Step3: React.FC<Step3Props> = ({ nextStep, prevStep, handleChange, formData, handleFileChange }) => {
    return (
        <div className="step-container">
            <h2>모임활동 장소를 정해주세요</h2>
            <div className="image-upload">
                <label htmlFor="groupImage">모임 사진 업로드:</label>
                <input
                    type="file"
                    id="groupImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input"
                />
                {formData.groupImage && (
                    <div className="image-preview">
                        <img src={URL.createObjectURL(formData.groupImage)} alt="Group Preview" style={{ width: "100px" }} />
                    </div>
                )}
            </div>
            <input
                type="text"
                placeholder="지역을 검색해주세요."
                onChange={handleChange('location')}
                value={formData.location}
                className="input-field"
            />
             <div className="button-container">
            <button className="prev-button" onClick={prevStep}>이전</button>
            <button className="next-button" onClick={nextStep}>다음</button>
            </div>
            </div>
    );
};

export default Step3;
