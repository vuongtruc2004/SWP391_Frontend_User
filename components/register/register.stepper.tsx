import { Box, Tooltip } from "@mui/material";
import { Fragment, SetStateAction } from "react";
import { motion } from 'framer-motion';

const RegisterStepper = (props: {
    step: number,
    setStep: React.Dispatch<SetStateAction<number>>
}) => {
    const { step, setStep } = props;

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            columnGap: '10px',
            'span': {
                width: '12px',
                aspectRatio: 1,
                borderRadius: '50%',
                border: '2px solid #6c757d',
                bgcolor: '#6c757d',
                transition: 'all .3s',
                cursor: 'pointer',
                flexShrink: 0,
                '&.active': {
                    borderColor: '#60a5fa',
                    bgcolor: 'transparent'
                }
            }
        }}>
            {Array.from({ length: 4 }).map((_, index) => (
                <Fragment key={index}>
                    <Tooltip title={`Bước ${index + 1}`} arrow placement="top">
                        <span className={step >= index + 1 ? "active" : ""} onClick={() => setStep(index + 1)} />
                    </Tooltip>

                    {index < 3 && (
                        <motion.div
                            animate={{
                                backgroundPosition: step > index + 1 ? '0% 0%' : '100% 0%'
                            }}
                            transition={{ duration: 0.5 }}
                            style={{
                                height: '1px',
                                width: '100%',
                                backgroundImage: 'linear-gradient(to right, #60a5fa 50%, #6c757d 50%)',
                                backgroundSize: '200% 100%',
                            }}
                        />
                    )}
                </Fragment>
            ))}
        </Box>
    );
};

export default RegisterStepper;
