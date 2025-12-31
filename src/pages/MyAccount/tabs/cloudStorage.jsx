import React, { useState } from "react";
import "./CloudStorage.css";

const CloudStorage = () => {
  const [openSection, setOpenSections] = useState({
    data: true,
    files: false,
  });  

  const toggle = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };  

  return (
    <div className="cloud-wrapper-first">
      <div className="icloud-storage-wrapper">
        <div className="icloud-storage-grid">

          <div className="icloud-storage-left">

            {/* HEADER */}
            <div className="icloud-storage-header">
              <h1>Your iCloud Storage</h1>
              <p>
                Use your iCloud storage to keep your most important information—like
                your photos, files, backups and more—secure, up to date and available
                across all your devices
              </p>
            </div>

            <StorageAccordion
              title="Data Storage"
              color="blue"
              isOpen={openSection.data}
              onToggle={() => toggle("data")}
            />

            <StorageAccordion
              title="File Storage"
              color="purple"
              isOpen={openSection.files}
              onToggle={() => toggle("files")}
            />

          </div>

          <div className="icloud-storage-right">
            <div className="right-spacer" />

            <div className="right-content">
              <div className="vertical-divider" />

              <div className="storage-help-card">
                <h3>How to Manage Your iCloud Storage</h3>
                <p>
                  Use Continue on Device to send a notification to your Apple devices
                  that will take you directly to iCloud Storage Settings.
                </p>
                <a href="#">Continue on Device…</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CloudStorage;
const StorageAccordion = ({ title, isOpen, onToggle, color }) => {
  return (
    <div className="storage-accordion">

      {/* HEADER */}
      <div className="accordion-header" onClick={onToggle}>
        <div className="accordion-left">
          <h3 style={{ fontSize: "22px" }}>{title}</h3>
          <span className="storage-badge">5 GB</span>
        </div>

        <div className={`chevron ${isOpen ? "open" : ""}`} />
      </div>

      {/* BAR */}
      <div className={`storage-bar ${color}`}>
        <div className="storage-used" />
        <div className="storage-system" />
        <div className="storage-free" />
      </div>

      {/* EXPANDABLE CONTENT */}
      {isOpen && (
        <div className="accordion-body">

          {/* UPGRADE CARD */}
          <div className="icloud-upgrade-card">
            <h3>Upgrade to iCloud+</h3>
            <p>
              Upgrade to iCloud+ to get even more storage and enhanced privacy
              features that protect you and your data.
            </p>
            <a href="#">Upgrade for ₹75.00/month</a>
          </div>

          {/* STORAGE LIST */}
          <div className="storage-list">
            <StorageRow label="Documents" size="3.9 GB" dot="orange" />
            <StorageRow label="Mail" size="45.5 MB" dot="blue" />
            <StorageRow label="Messages" size="143.9 KB" dot="green" />
          </div>

        </div>
      )}
    </div>
  );
};
const StorageRow = ({ label, size, dot }) => (
  <div className="storage-row">
    <div className="storage-left">
      <span className={`icon ${label.toLowerCase()}`} />
      <span>{label}</span>
    </div>
    <div className="storage-middle">All files</div>
    <div className="storage-right">
      <span>{size}</span>
      <span className={`dot ${dot}`} />
    </div>
  </div>
);
