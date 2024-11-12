import React from 'react';
import "../GroupForm.css";
import "./Step4.css"
import {FormData} from "../../../types";

interface Step4Props {
    nextStep: () => void;
    prevStep: () => void;
    handleChange: (input: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: FormData;
}

const Step4: React.FC<Step4Props> = ({ nextStep, prevStep, handleChange, formData }) => {
    const selectDuration = (days: number) => {
        handleChange('duration')({ target: { value: days } } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <div className="step-container">
            <h2>모임활동 시작 날짜를 정해주세요</h2>
            <input
                type="date"
                onChange={handleChange('startDate')}
                value={formData.startDate}
                className="input-field"
            />
            <h2>모집기간을 정해주세요</h2>
            <div className="duration-options">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <button
                        key={day}
                        onClick={() => selectDuration(day)}
                        className={`duration-button ${formData.duration === day ? 'active' : ''}`}
                    >
                        {day}일
                    </button>
                ))}
            </div>
             <div className="button-container">
            <button className="prev-button" onClick={prevStep}>이전</button>
            <button className="next-button" onClick={nextStep}>다음</button>
        </div>
        </div>
    );
};

export default Step4;
