import React from 'react';
import "../GroupForm.css";
import "./Step2.css"
import {FormData} from "../../../types";

interface Step2Props {
    nextStep: () => void;
    prevStep: () => void;
    handleChange: (input: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formData: FormData;
}

const Step2: React.FC<Step2Props> = ({ nextStep, prevStep, handleChange, formData }) => {
    return (
        <div className="step-container">
            <h2>모임을 소개해주세요</h2>
            <input
                type="text"
                placeholder="북클럽명을 정해주세요."
                onChange={handleChange('name')}
                value={formData.name}
                maxLength={15}
                className="input-field"
            />
            <textarea
                placeholder="모임을 소개해주세요. 모임 설정에서 수정할 수 있어요."
                onChange={handleChange('groupDescription')}
                value={formData.groupDescription}
                maxLength={500}
                className="textarea-field"
            />
            <button className="prev-button" onClick={prevStep}>이전</button>
            <button className="next-button" onClick={nextStep}>다음</button>
        </div>
    );
};

export default Step2;
