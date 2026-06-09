const React, { useState, useEffect } from "react";

export const OTPGenerator: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [time, setTime] = useState<number>(0);

  const generateOTP = (): void => {
    const val: number = Math.floor(Math.random() * 900000) + 100000;
    setOtp(val.toString());
    setTime(5);
  };

  useEffect(() => {
    if (time === 0) return;

    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      setTime((prev: number) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <div className="container">
      <h1 id="otp-title">OTP Generator</h1>

      <h2 id="otp-display">
        {otp ? otp : "Click 'Generate OTP' to get a code"}
      </h2>

      <p id="otp-timer" aria-live="polite">
        {time > 0
          ? `Expires in: ${time} seconds`
          : otp
          ? "OTP expired. Click the button to generate a new OTP."
          : ""}
      </p>

      <button
        id="generate-otp-button"
        onClick={generateOTP} 
        disabled={time > 0}
      >
        Generate OTP
      </button>
    </div>
  );
};