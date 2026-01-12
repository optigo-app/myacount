import React, { useEffect, useState } from "react";
import "./CloudStorage.css";
import { getCloudStorageData } from "../../../api/myAccountApi";

const CloudStorage = ({ clientIp, LUId }) => {
  const [openSection, setOpenSections] = useState({
    data: false,
    files: false,
  });

  const [storageData, setStorageData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!clientIp || !LUId) return;

    setLoading(true);

    getCloudStorageData(clientIp, LUId)
      .then(res => {
        setStorageData(res.Data); // backend response
      })
      .catch(err => {
        console.error("CloudStorage API error:", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [clientIp, LUId]);

  const toggle = (key) => {
    setOpenSections(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (loading) return <div>Loading storage...</div>;
  if (!storageData) return null;

  // console.log("storageData", storageData);
  const dataStorage = storageData?.rd?.[0];
  const fileStorage = storageData;
  console.log("dataStorage", dataStorage);
  
  return (
    <div className="cloud-wrapper-first">
      <div className="icloud-storage-wrapper">
        <div className="icloud-storage-grid">

          <div className="icloud-storage-left">
            <div className="icloud-storage-header">
              <h1>Your Cloud Storage</h1>
              <p>
                Use your Cloud storage to keep your most important information.
              </p>
            </div>

            <StorageAccordion
              title="Data Storage"
              color="blue"
              isOpen={openSection.data}
              onToggle={() => toggle("data")}
              total={dataStorage?.ToltalSpaceGB}
              used={dataStorage?.datausage}
              free={dataStorage?.RemainingGB}
              details={dataStorage}
            />
            
            <StorageAccordion
              title="File Storage"
              color="purple"
              isOpen={openSection.files}
              onToggle={() => toggle("files")}
              total="10 GB"
              used="6.2 GB"
              free="3.8 GB"
              // details={fileStorage}
            />
          </div>

          <div className="icloud-storage-right">
            <div className="right-spacer" />

            <div className="right-content">
              <div className="vertical-divider" />

              <div className="storage-help-card">
                <h3>How to Manage Your Cloud Storage</h3>
                <p>
                  Use Continue on Device to send a notification to your Apple devices
                  that will take you directly to Cloud Storage Settings.
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

const StorageAccordion = ({ title, isOpen, onToggle, color, total, used, free, details = [], }) => {
  return (
    <div className="storage-accordion">
        <div className="accordion-all-wrapper">
        {/* HEADER */}
        <div className="accordion-header-wrapper">
          <div className="accordion-bar-wrapper">
            <div className="accordion-header" onClick={onToggle}>
              <div className="accordion-left">
                <h3>{title}</h3>
                <span className="storage-badge">{total}</span>
              </div>

              <div className="storage-summary">
                <span className="storage-free">Free {free} GB</span>
                <span className="dot-separator">·</span>
                <span className="storage-used-text">Used {used} GB</span>
              </div>
            </div>

            {/* BAR */}
            <div className={`storage-bar ${color}`}>
              <div className="storage-used" />
              <div className="storage-system" />
              <div className="storage-free" />
            </div>
          </div>

          <div className="icloud-upgrade-card">
                <h3>Upgrade to Cloud+</h3>
                <p>
                  Upgrade to Cloud+ to get even more storage and enhanced privacy
                  features that protect you and your data.
              </p>
              <a href="#">Upgrade for ₹75.00/month</a>
          </div>

          <div className="accrodian-last" onClick={onToggle}>
            <div className="storage-free">View Details</div>
            <div className={`chevron ${isOpen ? "open" : ""}`} />
          </div>
        </div>

        {/* EXPANDABLE CONTENT */}
        {isOpen && (
          <div className="accordion-body">
            {/* STORAGE LIST */}
            <div className="storage-list">
            {/* {details.length === 0 ? (
              <div className="empty-text">No details available</div>
            ) : (
              details.map((item, index) => (
                <StorageRow
                  key={index}
                  label={item.ModuleName}
                  size={item.Usage}
                  dot="orange"
                />
              ))
            )} */}
              <StorageRow label="SALES" size="4.43 GB" dot="orange" />
              {/* <StorageRow label="Mail" size="45.5 MB" dot="blue" />
              <StorageRow label="Messages" size="143.9 KB" dot="green" /> */}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

const StorageRow = ({ label, size, dot }) => (
  <div className="storage-row">
    <div className="storage-left">
      <span>{label}</span>
    </div>
    <div className="storage-middle">All files</div>
    <div className="storage-right">
      <span>{size}</span>
      <span className={`dot ${dot}`} />
    </div>
  </div>
);
