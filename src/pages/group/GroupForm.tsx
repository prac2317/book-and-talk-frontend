import { useState } from 'react';
import Step1 from "./createForm/Step1.tsx";
import Step2 from "./createForm/Step2.tsx";
import Step3 from "./createForm/Step3.tsx";
import Step4 from "./createForm/Step4.tsx";
import Step5 from "./createForm/Step5.tsx";
import Step6 from "./createForm/Step6.tsx";
import "./GroupForm.css";

import { FormData} from "../../types";

const GroupForm = () => {
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

  return (
      <div className="meeting-creation-container">
        {step === 0 && <Step1 nextStep={nextStep} />}
        {step === 1 && <Step2 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
        {step === 2 && <Step3 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
        {step === 3 && <Step4 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
        {step === 4 && <Step5 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
        {step === 5 && <Step6 prevStep={prevStep} formData={formData} setFormData={setFormData}/>}
      </div>
  );
};

export default GroupForm;
