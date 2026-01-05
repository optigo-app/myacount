import React, { useState } from "react";
import YourPlan from "./tabs/yourPlan";
import CloudStorage from "./tabs/cloudStorage";
import Addons from "./tabs/Addons";
import ChangeHistory from "./tabs/changeHistory";
import Settings from "./tabs/Settings";
import UserLogin from "./tabs/userlogin";
import "./MyAccount.css";
import { Navigate, useNavigate } from "react-router-dom";

const tabs = [
  { id: "your-plan", label: "Your Plan" },
  { id: "your-storage", label: "Cloud Storage" },
  { id: "data-recovery", label: "Add Ons" },
  // { id: "change-history", label: "Change History" },
  { id: "settings", label: "User & Security" },
];

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("your-plan");
  const naviagte =  useNavigate();
  console.log("[MyAccount] render");

  const renderContent = () => {
    switch (activeTab) {
      case "your-plan":
        return <YourPlan />;
      case "your-storage":
        return <CloudStorage />;
      case "data-recovery":
        return <Addons />;
      // case "change-history":
      //   return <ChangeHistory />;
      case "settings":
        return <Settings />;
      default:
        return null;
    }
  };
  

  return (
    <div className="page-wrapper">
      <div className="myaccount-wrapper">
        {/* TOP TABS */}
        {/* <div style={{ width: "100%" }}> */}
          <div className="myaccount-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`myaccount-tab ${
                  activeTab === tab.id ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                {activeTab === tab.id && <span className="tab-underline" />}
              </button>
            ))}
          </div>
        {/* </div> */}

        {/* TAB CONTENT */}
        <div className="account-container">
          <div className="myaccount-content">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
