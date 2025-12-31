import React, { useState, useRef, useEffect } from "react";
import "./Settings.css";
import OtpBoxes from "../../../components/OtpBoxes";

const Settings = () => {
  const [active, setActive] = useState("profile");
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [confirmBox, setConfirmBox] = useState(null);
  const [showIpPopup, setShowIpPopup] = useState(false);
  const [ipForm, setIpForm] = useState({
    ip: "",
    requestBy: "",
  });
  const [ipError, setIpError] = useState("");
  const ipRegex =
    /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;

  const VALID_OTP = "123456";
  const [confirmAction, setConfirmAction] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef([]);
  const [otpError, setOtpError] = useState("");

  const NavItem = ({ label, active, onClick }) => (
    <div
      className={`settings-nav-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </div>
  );

  const Profile = () => {
    return (
      <div className="profile-container">

        {/* PROFILE CARD */}
        <div className="profile-card">
          <div className="profile-header">
            <button className="profile-edit-btn" onClick={() => setOpenEditProfile(true)}>Edit</button>
          </div>
          <div className="profile-grid">

            <ProfileField label="Full Name" value="Smith Martinez" />
            <ProfileField label="Company" value="Optigo Head Office" />
            <ProfileField label="Default Currency" value="INR" />

            <ProfileField label="Mobile No" value="9510213581" />
            <ProfileField label="Office No" value="9510213581" />
            <ProfileField label="Email" value="support@orail.in" />

            <ProfileField
              label="Address"
              value="g-20 ITC Building, Majura Gate, Surat, Gujarat - 395005"
              full
            />

          </div>
        </div>
      </div>
    );
  };

  const ProfileField = ({ label, value, full }) => (
    <div className={`profile-field ${full ? "full-width" : ""}`}>
      <span className="profile-label">{label}</span>
      <span className="profile-value">{value}</span>
    </div>
  );

  const IPSecurity = () => (<>
    <button className="profile-edit-btn" style={{ marginBottom: "1.5%" }} onClick={() => setShowIpPopup(true)}>
      + Add
    </button>
    <div className="ip-table">
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Entry Date</th>
            <th>IP Address</th>
            <th>Status</th>
            <th>Request By</th>
            <th>Activated On</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>12-Jan-2025</td>
            <td>192.168.1.10</td>
            <td>Active</td>
            <td>Admin</td>
            <td>13-Jan-2025</td>
            <td>❌</td>
          </tr>
          <tr>
            <td>2</td>
            <td>20-Jan-2025</td>
            <td>10.10.10.5</td>
            <td>Pending</td>
            <td>User</td>
            <td>—</td>
            <td>❌</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
  );

  const ResetAccount = () => (
    <div className="reset-wrapper">

      {/* ROW 1 → 50 / 50 */}
      <div className="reset-row">
        <ResetBox title="Full Reset">
          <p><strong>What is Full Reset?</strong></p>
          <p>All data of your Optigo account will be deleted.</p>

          <button
            className="danger-btn"
            onClick={() => setConfirmAction("full-reset")}
          >
            Full Reset
          </button>
        </ResetBox>

        <ResetBox title="Clear Transaction">
          <p><strong>What is Clear Transaction?</strong></p>
          <p>Following entries will <strong>NOT</strong> be deleted:</p>
          <ul style={{ fontSize: "18px" }}>
            <li>Master & Policy</li>
            <li>Design Master</li>
            <li>User Master</li>
          </ul>

          <button
            className="warning-btn"
            onClick={() => setConfirmAction("clear-transaction")}
          >
            Clear Transaction
          </button>
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

          <p>
            Step 1: <strong>Send OTP</strong> to registered mobile number.
          </p>
          <p>
            Step 2: <strong>Send Mail</strong> with reset link to registered email ID.
          </p>
        </ResetBox>
      </div>

    </div>
  );

  const ResetBox = ({ title, children }) => (
    <div className="reset-box">
      <h4>{title}</h4>
      {children}
    </div>
  );

  const DrawerInput = ({ label, value }) => (
    <div className="drawer-input">
      <label>{label}</label>
      <input defaultValue={value} />
    </div>
  );

  return (
    <div className="settings-wrapper-first">
      <div className="settings-head">
        <h1 style={{ marginBottom: "6px", fontSize: "38px" }}>
          User & Security
        </h1>
      </div>
      <div className="settings-main">

        {/* LEFT NAV */}
        <div className="settings-nav">
          <div className="icloud-card">
            <div className="icloud-card-content">
              <div className="icloud-logo">Smith Martinez</div>

              <div className="icloud-links">
                <span>Pro Factory</span>
                <span>Storage ›</span>
              </div>

              <div className="icloud-badge">5 GB</div>
            </div>
          </div>
          <NavItem label="Profile" active={active === "profile"} onClick={() => setActive("profile")} />
          <NavItem label="Reset Account" active={active === "reset"} onClick={() => setActive("reset")} />
          <NavItem label="IP Security" active={active === "ip"} onClick={() => setActive("ip")} />
        </div>

        <div className="settings-divider" />

        {/* RIGHT CONTENT */}
        <div className="settings-content">
          {active === "profile" && <Profile />}
          {active === "reset" && <ResetAccount />}
          {active === "ip" && <IPSecurity />}
        </div>

        {openEditProfile && (
          <>
            {/* OVERLAY */}
            <div
              className="drawer-overlay"
              onClick={() => setOpenEditProfile(false)}
            />

            {/* DRAWER */}
            <div className="drawer drawer-open">
              <div className="drawer-header">
                <h3>Update Profile</h3>
                <button
                  className="drawer-close"
                  onClick={() => setOpenEditProfile(false)}
                >
                  ✕
                </button>
              </div>

              <div className="drawer-body">
                <DrawerInput label="First Name" value="Smith" />
                <DrawerInput label="Last Name" value="Martinez" />
                <DrawerInput label="Company" value="Optigo Head Office" />
                <DrawerInput label="Email" value="support@orail.in" />
                <DrawerInput label="Mobile No" value="9510213581" />
                <DrawerInput label="Office No" value="9510213581" />
                <DrawerInput label="Address" value="g-20 ITC Building, Majura Gate, Surat" />
                <DrawerInput label="State" value="Gujarat" />
                <DrawerInput label="Zip" value="395005" />
                <DrawerInput label="Default Currency" value="INR" />

                <button className="drawer-save-btn">
                  Save Changes
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {showIpPopup && (
        <>
          <div className="confirm-overlay" />

          <div className="confirm-modal">
            <h3>Add IP Request</h3>

            <div className="drawer-input">
              <label>Entry Date</label>
              <input value={new Date().toLocaleDateString()} readOnly />
            </div>

            <div className="drawer-input">
              <label>IP Address</label>
              <input
                value={ipForm.ip}
                onChange={(e) =>
                  setIpForm({ ...ipForm, ip: e.target.value })
                }
              />
            </div>

            <div className="drawer-input">
              <label>Request By</label>
              <input
                value={ipForm.requestBy}
                onChange={(e) =>
                  setIpForm({ ...ipForm, requestBy: e.target.value })
                }
              />
            </div>

            {ipError && <p className="otp-error">{ipError}</p>}

            <div className="confirm-actions" style={{ width: "495px" }}>
              <button
                className="confirm-cancel"
                onClick={() => setShowIpPopup(false)}
              >
                Cancel
              </button>

              <button
                className="Ip-Proceed"
                onClick={() => {
                  if (!ipRegex.test(ipForm.ip)) {
                    setIpError("Enter a valid IP address");
                    return;
                  }
                  console.log("IP Request Sent:", ipForm);
                  setShowIpPopup(false);
                  setIpForm({ ip: "", requestBy: "" });
                  setIpError("");
                }}
              >
                Proceed
              </button>
            </div>
          </div>
        </>
      )}

      {confirmAction && (
        <>
          <div className="drawer-overlay" />

          <div className="confirm-modal">
            <h3>Are you sure?</h3>
            <p>
              {confirmAction === "full-reset"
                ? "This will erase all your account data permanently."
                : "This will clear all transactions and settings."}
            </p>

            <div className="confirm-actions">
              <button className="handle-cancel" onClick={() => setConfirmAction(null)}>Cancel</button>
              <button
                className="danger-btn"
                onClick={() => {
                  setConfirmAction(null);
                  setShowOtp(true);
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </>
      )}

      {showOtp && (
        <>
          <div className="drawer-overlay" />

          <div className="confirm-modal">
            <h3>Verify OTP</h3>
            <p>OTP sent to +91 98744 53581</p>

            <OtpBoxes
              otp={otp}
              setOtp={setOtp}
              onSubmit={() => {
                const enteredOtp = otp.join("");

                if (enteredOtp === "123456") {
                  setShowOtp(false);
                  setOtp(["", "", "", "", "", ""]);
                  alert("OTP verified successfully");
                } else {
                  setOtpError("Invalid OTP");
                }
              }}
            />

            {otpError && <div className="otp-error">{otpError}</div>}

            <div className="confirm-actions">
              <button
                className="handle-cancel"
                onClick={() => {
                  setShowOtp(false);
                  setOtp(["", "", "", "", "", ""]);
                  setOtpError("");
                }}
              >
                Cancel
              </button>

              <button
                className="danger-btn"
                disabled={otp.some((d) => d === "")}
                onClick={() => {
                  const enteredOtp = otp.join("");
                  if (enteredOtp === VALID_OTP) {
                    setShowOtp(false);
                    setOtp(["", "", "", "", "", ""]);
                    setOtpError("");
                    alert("Action completed successfully");
                  } else {
                    setOtpError("Invalid OTP");
                  }
                }}
              >
                Verify & Proceed
              </button>
            </div>
          </div>
        </>
      )}

    </div>
  );

};

export default Settings;
