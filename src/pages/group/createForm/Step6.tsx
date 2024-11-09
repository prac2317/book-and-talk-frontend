import React from 'react';
import "../GroupForm.css";
import "./Step6.css"
import {FormData} from "../../../types";

interface Step6Props {
    prevStep: () => void;
    formData: FormData;
}

const Step6: React.FC<Step6Props> = ({ prevStep, formData }) => {
    const submitForm = () => {
        // formData를 API로 전송하는 로직을 구현합니다.
        console.log('Form Data:', formData);
        // 실제로는 fetch나 axios 등을 사용해 API로 formData를 전송할 수 있습니다.
    };


    return (
        <div className="step-container">
            <h2>모임 생성이 완료되었습니다</h2>
            <button className="prev-button" onClick={prevStep}>이전</button>
            <button className="complete-button" onClick={submitForm}>완료</button>
        </div>
    );
};

export default Step6;
