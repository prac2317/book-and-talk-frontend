import React from 'react';
import "../GroupForm.css";
import "./Step5.css"
import {FormData} from "../../../types";

interface Step5Props {
    nextStep: () => void;
    prevStep: () => void;
    handleChange: (input: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formData: FormData;
}

const Step5: React.FC<Step5Props> = ({ nextStep, prevStep, handleChange, formData }) => {
    const selectMaxParticipants = (num: number) => {
        handleChange('maxParticipants')({ target: { value: num } } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <div className="step-container">
            <h2>어떤 사람들과 함께하고 싶나요?</h2>
            <div className="participant-options">
                {[3, 5, 10].map((num) => (
                    <button
                        key={num}
                        onClick={() => selectMaxParticipants(num)}
                        className={`participant-button ${formData.maxParticipants === num ? 'active' : ''}`}
                    >
                        {num}명
                    </button>
                ))}
                <input
                    type="number"
                    placeholder="직접 입력"
                    onChange={handleChange('maxParticipants')}
                    value={formData.maxParticipants}
                    className="input-field"
                />
            </div>
            <textarea
                placeholder="가입신청 시 보여질 질문을 적어주세요."
                onChange={handleChange('groupDescription')}
                maxLength={200}
                className="textarea-field"
            />
            <button className="prev-button" onClick={prevStep}>이전</button>
            <button className="next-button" onClick={nextStep}>다음</button>
        </div>
    );
};

export default Step5;
