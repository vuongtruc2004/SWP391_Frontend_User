'use client'
import { useRegisterStep } from "@/wrapper/register-step/register.step.wrapper";
import FirstStep from "./register-all-step/first.step";
import SecondStep from "./register-all-step/second.step";
import ThirdStep from "./register-all-step/third.step";
import FourthStep from "./register-all-step/fourth.step";
import FifthStep from "./register-all-step/fifth.step";


const RegisterStepBody = () => {
    const { activeStep } = useRegisterStep();

    if (activeStep === 0) {
        return (
            <FirstStep />
        )
    } else if (activeStep === 1) {
        return (
            <SecondStep />
        )
    } else if (activeStep === 2) {
        return (
            <ThirdStep />
        )
    } else if (activeStep === 3) {
        return (
            <FourthStep />
        )
    } else {
        return (
            <FifthStep />
        )
    }

};

export default RegisterStepBody;
