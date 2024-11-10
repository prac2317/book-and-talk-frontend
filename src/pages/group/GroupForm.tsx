import { useState } from 'react';
import Step1 from "./createForm/Step1.tsx";
import Step2 from "./createForm/Step2.tsx";
import Step3 from "./createForm/Step3.tsx";
import Step4 from "./createForm/Step4.tsx";
import Step5 from "./createForm/Step5.tsx";
import Step6 from "./createForm/Step6.tsx";
import "./GroupForm.css";

import { FormData} from "../../types";
import {useLocation} from "react-router-dom";

const GroupForm = () => {

  const { state } = useLocation();
  const { book } = state || {}; // 전달된 book 정보 추출

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    maxParticipants: 0,
    startDate: '',
    duration: 1,
    groupDescription: '',
    bookId: null,
    location: '',
    groupImage: null,
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (input: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, groupImage: e.target.files[0] });
    }
  };

  return (
      <div className="meeting-creation-container">
        {step === 0 && <Step1 nextStep={nextStep} book={book} />}
        {step === 1 && <Step2 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
        {step === 2 && <Step3 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} handleFileChange={handleFileChange} />}
        {step === 3 && <Step4 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
        {step === 4 && <Step5 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
        {step === 5 && <Step6 prevStep={prevStep} book={book} formData={formData} setFormData={setFormData}/>}
      </div>
  );
};

export default GroupForm;
