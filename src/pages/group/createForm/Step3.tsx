import React from 'react';
import "../GroupForm.css";
import "./Step3.css"
import {FormData} from "../../../types";

interface Step3Props {
    nextStep: () => void;
    prevStep: () => void;
    handleChange: (input: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: FormData;
}

const Step3: React.FC<Step3Props> = ({ nextStep, prevStep, handleChange, formData }) => {
    return (
        <div className="step-container">
            <h2>모임활동 장소를 정해주세요</h2>
            <input
                type="text"
                placeholder="지역을 검색해주세요."
                onChange={handleChange('location')}
                value={formData.location}
                className="input-field"
            />
            <button className="prev-button" onClick={prevStep}>이전</button>
            <button className="next-button" onClick={nextStep}>다음</button>
        </div>
    );
};

export default Step3;
