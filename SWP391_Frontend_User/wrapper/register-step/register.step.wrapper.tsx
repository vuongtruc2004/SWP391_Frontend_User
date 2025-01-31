'use client'
import { createContext, SetStateAction, useContext, useState } from "react";

interface RegisterStep {
    activeStep: number;
    setActiveStep: React.Dispatch<SetStateAction<number>>;
}

const init: RegisterStep = {
    activeStep: 0,
    setActiveStep: () => { }
};

const RegisterStepContext = createContext<RegisterStep>(init);

const RegisterStepWrapper = ({ children }: { children: React.ReactNode }) => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <RegisterStepContext.Provider value={{ activeStep, setActiveStep }}>
            {children}
        </RegisterStepContext.Provider>
    );
};

const useRegisterStep = () => {
    return useContext(RegisterStepContext);
};

export { RegisterStepWrapper, useRegisterStep };
