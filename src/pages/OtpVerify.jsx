import React, { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import "./OtpVerify.css";
import slide1 from "../assets/otp-slider/slide1.png";
import slide2 from "../assets/otp-slider/slide2.png";
import slide3 from "../assets/otp-slider/slide3.png";

const images = [slide1, slide2, slide3];

const OtpVerify = ({ onOtpSuccess }) => {
  const CN = sessionStorage.getItem("CN");
  // console.log("CN available in OtpVerify:", CN);

  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const navigate = useNavigate();
  const [step, setStep] = useState("send");
  // const isOtpVerfied = sessionStorage.getItem('otp_verified');
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(["A", "-", "", "", "", ""]);
  const inputsRef = useRef([]);
  const RESEND_TIME = 60;
  const [resendTimer, setResendTimer] = useState(RESEND_TIME);
  const [canResend, setCanResend] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (step !== "verify") return;
    if (canResend) return; 

    if (resendTimer === 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendTimer, step, canResend]);

  const handleChange = (value, index) => {
    if (index < 2) return;

    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (index < 2) {
      e.preventDefault();
      return;
    }

    if (e.key === "Backspace" && !otp[index] && index > 2) {
      inputsRef.current[index - 1]?.focus();
    }

    if (e.key === "Enter") {
      handleVerify();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, OTP_LENGTH);

    if (!/^\d+$/.test(pasted)) return;

    const newOtp = pasted.split("");
    setOtp(newOtp);

    newOtp.forEach((_, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = newOtp[i];
      }
    });

    inputsRef.current[Math.min(pasted.length, OTP_LENGTH) - 1]?.focus();
  };

  const handleVerify = () => {
    const enteredOtp = otp.slice(2).join("");
  
    if (enteredOtp === "1234") {
      sessionStorage.setItem("otp_verified", "true");
  
      // console.log("[OtpVerify] OTP verified, updating App state");
  
      onOtpSuccess();
      navigate("/", { replace: true });
    } else {
      setError("Incorrect OTP. Please try again.");
    }
  };           

  const captions = [
    {
      title: "Secure Cloud Access",
      desc: "Your account is protected with multi-layer security.",
    },
    {
      title: "Access Anywhere",
      desc: "Stay connected across all your devices seamlessly.",
    },
    {
      title: "Data You Can Trust",
      desc: "Your information is encrypted and always protected.",
    },
  ];

  const handleSendOtp = () => {
    setStep("verify");
    setCanResend(true);
  };

  const handleResend = () => {
    if (!canResend) return;
  
    // API call later
    setCanResend(false);
    setResendTimer(RESEND_TIME);
    setError("");
  };

  return (
    <div className="otp-page">

      {/* LEFT */}
      <div className="otp-left">
        <div className="otp-card">

          <div className="otpHead">
            <div className="otp-brand">OPTIGO</div>
            <h1>Verify your identity</h1>
          </div>

          {/* STEP 1 — SEND OTP */}
          {step === "send" && (
            <>
              <p className="otp-subtitle">
                We will send a verification code to your registered mobile number.
              </p>

              <div className="otp-mobile">
                +91 98744 53581
              </div>

              <button className="otp-btn" onClick={handleSendOtp}>
                Send OTP
              </button>

              <div className="otp-footer"></div>
            </>
          )}

          {/* STEP 2 — VERIFY OTP */}
          {step === "verify" && (
            <form
              className="otp-handle"
              onSubmit={(e) => {
                e.preventDefault();
                handleVerify();
              }}
            >
              <p className="otp-subtitle">
                Enter the 4-digit code sent to your mobile number.
              </p>

              <div className="otp-box-wrapper" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputsRef.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    disabled={index < 2}
                    className={`otp-box ${index < 2 ? "otp-fixed" : ""}`}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>

              {error && <div className="otp-error">{error}</div>}

              <button type="submit" className="otp-btn">
                Continue
              </button>

              <div className="otp-footer">
                {!canResend ? (
                  <span style={{ color: "#6e6e73" }}>
                    Resend OTP in <span>{resendTimer}s</span>
                  </span>
                ) : (
                  <span>
                    <span style={{ color: "#6e6e73" }}>
                      Didn’t receive the code?{" "}
                    </span>
                    <span onClick={handleResend} className="resend-active">
                      Resend
                    </span>
                  </span>
                )}
              </div>
            </form>
          )}

        </div>

      </div>

      {/* RIGHT */}
      <div className="otp-right">
        <div className="slider-card">
          <img src={images[activeImage]} alt="Security slide" />

          <div className="slide-text">
            <h3>{captions[activeImage].title}</h3>
            <p>{captions[activeImage].desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
