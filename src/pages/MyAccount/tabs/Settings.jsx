import React, { useState, useEffect } from "react";
import "./Settings.css";
import ResetAccount from "./settings-navbar/ResetAccount";
import Profile from "./settings-navbar/Profile";
import IPSecurity from "./settings-navbar/IPSecurity";

const Settings = ({ clientIp, settingdata }) => {
  const [active, setActive] = useState("profile");
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [showIpPopup, setShowIpPopup] = useState(false);
  const [ipForm, setIpForm] = useState({
    ip: "",
    requestBy: "",
  });
  const [ipError, setIpError] = useState("");
  const ipRegex =
    /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
  // console.log("clientIp",clientIp);

    useEffect(() => {
      if (clientIp) {
        setIpForm((prev) => ({
          ...prev,
          ip: clientIp,
        }));
      }
    }, [clientIp]);
    
    const rcvData = settingdata?.rd?.[0];
    console.log("rcvData", rcvData);

    const NavItem = ({ label, active, onClick, variant }) => (
      <div
        className={`settings-nav-item 
          ${active ? "active" : ""} 
          ${variant === "danger" ? "nav-danger" : ""}`}
        onClick={onClick}
      >
        {label}
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
          <NavItem label="IP Security" active={active === "ip"} onClick={() => setActive("ip")} />
          <NavItem label="Reset Account" active={active === "reset"} onClick={() => setActive("reset")} variant="danger" />
        </div>

        <div className="settings-divider" />

        {/* RIGHT CONTENT */}
        <div className="settings-content">
          {active === "profile" && (
            <Profile setOpenEditProfile={setOpenEditProfile} rcvData={rcvData} />
          )}
          {active === "ip" && (
            <IPSecurity setShowIpPopup={setShowIpPopup} />
          )}
          {active === "reset" && <ResetAccount />}
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
                <DrawerInput label="First Name" value={rcvData.basicinfo_firstname || ""} />
                <DrawerInput label="Last Name" value={rcvData.basicinfo_lastname || ""} />
                <DrawerInput label="Company" value={rcvData.cmpinfo_companyname || ""} />
                <DrawerInput label="Email" value={rcvData.basicinfo_email || ""} />
                <DrawerInput label="Mobile No" value={rcvData.basicinfo_mobileno || ""} />
                <DrawerInput label="Office No" value={rcvData.cmpinfo_officeph || ""} />
                <DrawerInput label="Address1" value={rcvData.cmpinfo_addressline1 || ""} />
                <DrawerInput label="Address2" value={rcvData.cmpinfo_addressline2 || ""} />
                <DrawerInput label="State" value={rcvData.cmpinfo_state || ""} />
                <DrawerInput label="Zip" value={rcvData.cmpinfo_postalcode || ""} />
                <DrawerInput label="Default Currency" value={rcvData.Country_CurrencyCode || ""} />

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

            <div className="confirm-actions">
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
    </div>
  );

};

export default Settings;
