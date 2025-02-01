import React, { useState } from "react";
import { Box, TextField } from "@mui/material";

const FifthStep = () => {
    const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]); // Array for 6 OTP fields

    const handleKeyDown = (e: any, index: any) => {
        if (e.key === "Backspace" && otpValues[index] === "") {
            if (index > 0) {
                const prevInput = document.getElementById(`otp-input-${index - 1}`);
                prevInput?.focus();
            }
        }
    };

    const handleInputChange = (e: any, index: any) => {
        const value = e.target.value;
        const isNumber = /^[0-9]$/.test(value); // Chỉ chấp nhận số 0-9

        if (isNumber || value === "") {
            const newOtpValues = [...otpValues];
            newOtpValues[index] = value;

            setOtpValues(newOtpValues);

            // Focus next input if a value is entered
            if (isNumber && index < otpValues.length - 1) {
                const nextInput = document.getElementById(`otp-input-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    return (
        <Box
            sx={{
                padding: "40px 0",
                ".MuiInputBase-input": {
                    color: "black",
                    textAlign: "center",
                    fontSize: '25px',
                    fontWeight: 900
                },
                form: {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: "30px",

                },

            }}
        >
            <p className="text-center text-2xl">Nhập mã OTP</p>
            <p className="text-center">
                Vui lòng xác thực mã OTP chúng tôi đã gửi đến Email{" "}
                <span className="text-blue-500">borisdoo8386@gmail.com</span>
            </p>
            <form className="flex gap-x-2">
                {otpValues.map((value, index) => (
                    <TextField
                        key={index}
                        id={`otp-input-${index}`}
                        value={value}
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        size="small"
                        required
                        name="otpCode"
                        inputProps={{
                            inputMode: "numeric", // Hiển thị bàn phím số trên di động
                            pattern: "[0-9]*",    // Chỉ chấp nhận số
                        }}
                        sx={{
                            border: "1px solid black",
                            borderRadius: "10px",
                            width: "70px",
                            textAlign: "center",
                        }}
                    />
                ))}
            </form>
        </Box>
    );
};

export default FifthStep;
