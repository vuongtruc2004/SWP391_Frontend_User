'use client'
import { useRegisterStep } from "@/wrapper/register-step/register.step.wrapper";

const RegisterStepBody = () => {
    const { activeStep } = useRegisterStep();

    return (
        // code body vao day
        <p>Step hiện tại: {activeStep}</p>
    );
};

export default RegisterStepBody;
