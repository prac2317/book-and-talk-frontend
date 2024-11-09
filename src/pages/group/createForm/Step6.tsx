import React from 'react';
import "../GroupForm.css";
import "./Step6.css"
import {FormData} from "../../../types";
import ky from 'ky';

interface Step6Props {
    prevStep: () => void;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Step6: React.FC<Step6Props> = ({ prevStep, formData, setFormData }) => {
    const submitForm = async () => {
        try {
            setFormData((prevFormData) => ({...prevFormData, bookId: 3}))
            console.log(formData.bookId);
            const response = await ky.post('http://localhost:8080/api/groups/new', {
                json: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // 토큰이 필요할 경우 헤더에 추가
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('클럽이 성공적으로 생성되었습니다.');
            }
        } catch (error) {
            console.error('클럽 생성 중 오류 발생:', error);
        }
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
