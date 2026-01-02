import React, { useState, useEffect } from "react";
import "./ResetAccount.css";
import OtpBoxes from "../../../../components/OtpBoxes";

const ResetAccount = ({ setConfirmAction }) => {
    const [flowStep, setFlowStep] = useState("default");
    const [resetType, setResetType] = useState(null);
    
    const OTP_LENGTH = 6;
    const VALID_OTP = "123456";

    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const [otpError, setOtpError] = useState("");
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [otpSuccessMsg, setOtpSuccessMsg] = useState("");

    const [progress, setProgress] = useState(0);

    const handleCancelFlow = () => {
        setFlowStep("default");
        setResetType(null);
    };

    const resetOtpState = () => {
        setOtp(Array(OTP_LENGTH).fill(""));
        setOtpError("");
        setOtpSuccessMsg("");
        setIsOtpVerified(false);
    };

    const verifyOtp = () => {
        const enteredOtp = otp.join("");
      
        if (enteredOtp.length !== OTP_LENGTH) return;
      
        if (enteredOtp === VALID_OTP) {
          setIsOtpVerified(true);
          setOtpError("");
          setOtpSuccessMsg("OTP verified successfully");
        } else {
          setIsOtpVerified(false);
          setOtpSuccessMsg("");
          setOtpError("Invalid OTP. Please Enter Valid OTP.");
        }
    };

    useEffect(() => {
        if (flowStep === "otp") {
          resetOtpState();
        }
    }, [flowStep]);

    useEffect(() => {
        if (flowStep === "otp") {
          if (otp.every((d) => d !== "")) {
            verifyOtp();
          } else {
            setIsOtpVerified(false);
            setOtpSuccessMsg("");
            setOtpError("");
          }
        }
    }, [otp, flowStep]);

    useEffect(() => {
        if (flowStep !== "progress") return;
      
        setProgress(0);
      
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
      
              // simulate completion
              setTimeout(() => {
                handleCancelFlow(); // reset everything
              }, 800);
      
              return 100;
            }
            return prev + 5;
          });
        }, 250);
      
        return () => clearInterval(interval);
    }, [flowStep]);
      
  return (
    <>
        {flowStep === "default" && (
            <div className="reset-wrapper">

            {/* ROW 1 → 50 / 50 */}
            <div className="reset-row">
                <ResetBox title="Full Reset">
                    <div className="reset-box-extra">
                        <div>
                            <p><strong>What is Full Reset?</strong></p>
                            <p>All data of your Optigo account will be deleted.</p>
                        </div>

                        <div>
                            <button
                                className="danger-btn-full"
                                onClick={() => {
                                    setResetType("full-reset");
                                    setFlowStep("confirm");
                                }}
                            >
                                Full Reset
                            </button>
                        </div>
                    </div>
                </ResetBox>

                <ResetBox title="Clear Transaction">
                    <div className="reset-box-extra">
                        <div>
                            <p><strong>What is Clear Transaction?</strong></p>
                            <p>Following entries will <strong>NOT</strong> be deleted:</p>

                            <ul style={{ fontSize: "16px", margin: "2% 0%" }}>
                                <li>Master & Policy</li>
                                <li>Design Master</li>
                                <li>User Master</li>
                            </ul>
                        </div>
                        <div>
                            <button
                                className="warning-btn"
                                onClick={() => {
                                    setResetType("clear-transaction");
                                    setFlowStep("confirm");
                                }}              
                            >
                                Clear Transaction
                            </button>
                        </div>
                    </div>
                </ResetBox>
            </div>

            {/* ROW 2 → FULL WIDTH */}
            <div className="reset-row-full">
                <ResetBox title="Reset Link">
                <div className="reset-link-row">
                    <input
                    value="https://optigo/reset/xyz123"
                    readOnly
                    className="reset-link-input"
                    id="resetLinkInput"
                    />

                    <button
                    className="copy-btn"
                    onClick={() => {
                        const input = document.getElementById("resetLinkInput");
                        navigator.clipboard.writeText(input.value);
                    }}
                    >
                    Copy
                    </button>
                </div>

                <div className="reset-action-row">
                    <button className="primary-btn">Send OTP</button>
                    <button className="primary-btn">Send Email</button>
                </div>

                <p>
                    Step 1: <strong>Send OTP</strong> to registered mobile number.
                </p>
                <p>
                    Step 2: <strong>Send Mail</strong> with reset link to registered email ID.
                </p>
                </ResetBox>
            </div>

            </div>
        )}

        {flowStep === "confirm" && (
            <div className="reset-confirm-wrapper">
                <div className="reset-confirm-box">

                <h3>
                    {resetType === "full-reset"
                    ? "Full Reset Confirmation"
                    : "Clear Transaction Confirmation"}
                </h3>

                <p className="reset-confirm-text">
                    {resetType === "full-reset" ? (
                    <>
                        By continuing this action,<strong> all your account data will be permanently deleted</strong>.<br />
                        The following modules’ data will be removed completely:
                        <p style={{ padding: "2% 3%", margin: "0" }}>
                            <p style={{ margin: "0" }}>User Master</p>
                            <p style={{ margin: "0" }}>Masters & Policy</p>
                            <p style={{ margin: "0" }}>Sales CRM</p>
                            <p style={{ margin: "0" }}>Book Keeping</p>
                            <p style={{ margin: "0" }}>Vendor</p>
                            <p style={{ margin: "0" }}>Manufacturing</p>
                            <p style={{ margin: "0" }}>PD Module</p>
                            <p style={{ margin: "0" }}>Accounts Module</p>
                            <p style={{ margin: "0" }}>Inventory Module</p>
                            <p style={{ margin: "0" }}>E-Commerce Back Office</p>
                            <p style={{ margin: "0" }}>System Admin</p>
                        </p>
                        This process cannot be rollback. Once data, cannot be recovered.
                    </>
                    ) : (
                    <>
                        By performing this action, the following data will be deleted:
                        <p style={{ padding: "2% 3%", margin: "0" }}>
                            <p style={{ margin: "0" }}>All transactions</p>
                            <p style={{ margin: "0" }}>All invoices</p>
                            <p style={{ margin: "0" }}>All transaction history</p>
                            <p style={{ margin: "0" }}>Masters & Policy, Design Master, User Master data will not be deleted.</p>
                        </p>
                        This process cannot be undone.
                    </>
                    )}
                </p>

                <p className="reset-confirm-question">
                    Do you still want to proceed?
                </p>

                <div className="reset-confirm-actions">
                    <button
                        className="handle-cancel"
                        onClick={handleCancelFlow}
                        style={{ marginTop: "0px" }}
                    >
                    Cancel
                    </button>

                    <button
                        className="danger-btn"
                        onClick={() => setFlowStep("otp")}
                        style={{ marginTop: "0px" }}
                    >
                    Proceed
                    </button>
                </div>

                </div>
            </div>
        )}

        {flowStep === "otp" && (
            <div className="reset-confirm-wrapper">
                <div className="reset-confirm-box">

                <h3>Verify your mobile number</h3>

                <p className="reset-confirm-text">
                    An OTP sent to the registered mobile number
                </p>

                <p className="reset-mobile">
                    +91 95102 13581
                </p>

                {/* <button
                    className="primary-btn"
                    style={{ marginBottom: "16px" }}
                    onClick={() => {
                    // API call later
                    setOtpError("");
                    }}
                >
                    Send OTP
                </button> */}

                <OtpBoxes
                    otp={otp}
                    setOtp={setOtp}
                    onSubmit={() => {}} 
                />

                {otpError && <div style={{ color: "red", fontSize: "18px", marginTop: "1.5%", marginLeft: "2%" }}>{otpError}</div>}
  
                {otpSuccessMsg && ( <div style={{ color: "green", fontSize: "18px", marginTop: "1.5%", marginLeft: "2%" }}>{otpSuccessMsg}</div> )}

                <div className="reset-confirm-actions">
                    <button
                        className="handle-cancel"
                        onClick={() => {
                            resetOtpState();
                            handleCancelFlow();
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        className="danger-btn"
                        onClick={() => {
                            const enteredOtp = otp.join("");
                        
                            if (enteredOtp.length === 0) {
                              setOtpError("Please enter OTP");
                              return;
                            }
                        
                            if (enteredOtp.length < OTP_LENGTH) {
                              setOtpError("Please enter complete OTP");
                              return;
                            }
                        
                            if (!isOtpVerified) {
                              setOtpError("Invalid OTP. Please enter valid OTP.");
                              return;
                            }
                        
                            resetOtpState();
                            setFlowStep("final-confirm");
                          }}
                    >
                        Proceed
                    </button>
                </div>

                </div>
            </div>
        )}

        {flowStep === "final-confirm" && (
            <div className="reset-confirm-wrapper">
                <div className="reset-confirm-box">

                <h3>Final Confirmation</h3>

                <p className="reset-confirm-text">
                    You have successfully verified your mobile number.
                </p>

                <p className="reset-confirm-question">
                    Are you sure you still want to proceed?
                </p>

                <div className="reset-confirm-actions">
                    <button
                        className="handle-cancel"
                        onClick={handleCancelFlow}
                        style={{ marginTop: "0px" }}
                    >
                    Cancel
                    </button>

                    <button
                        className="danger-btn"
                        onClick={() => setFlowStep("progress")}
                        style={{ marginTop: "0px" }}
                    >
                    Proceed
                    </button>
                </div>

                </div>
            </div>
        )}

        {flowStep === "progress" && (
            <div className="reset-confirm-wrapper" style={{ paddingBottom: "24px" }}>
                <div className="reset-confirm-box">

                <h3>
                    {resetType === "full-reset"
                    ? "Performing Full Reset"
                    : "Clearing Transactions"}
                </h3>

                <p className="reset-confirm-text">
                    Please wait while we complete the process.
                    Do not refresh or close the page.
                </p>

                <div className="progress-bar-wrapper">
                    <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="progress-percent">
                    {progress}%
                </div>

                </div>
            </div>
        )}
    </>
  );
};

const ResetBox = ({ title, children }) => (
  <div className="reset-box">
    <h4>{title}</h4>
    {children}
  </div>
);

export default ResetAccount;
