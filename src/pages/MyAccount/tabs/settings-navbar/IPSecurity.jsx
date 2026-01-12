import React, { useState } from "react";
import "./IPSecurity.css";
import { softDeleteIpSecurity } from "../../../../api/myAccountApi";
import toast from "react-hot-toast";

const IPSecurity = ({ setShowIpPopup, ipData, onRefresh, clientIp, LUId }) => {
  const [confirmPopup, setConfirmPopup] = useState({
    open: false,
    ip: null,
  });

  if (!Array.isArray(ipData) || ipData.length === 0) {
    return (
      <>
        <button
          className="profile-edit-btn"
          style={{ marginBottom: "1.5%" }}
          onClick={() => setShowIpPopup(true)}
        >
          + Add
        </button>
  
        <p>No IP records found</p>
      </>
    );
  }

  const formatDateOnly = (dateTime) => {
    if (!dateTime) return "—";
    return dateTime.split(" ").slice(0, 3).join(" ");
  };

  const handleDeleteIp = async (ip) => {
    const body = {
      con: JSON.stringify({
        mode: "softdeleteIpSecurity",
        appuserid: LUId,
        IPAddress: clientIp,
      }),
      p: JSON.stringify({
        ipid: ip.id,
        newIpAddress: ip.IPAddress,
        appuserid: LUId,
        RequestBy: ip.RequestBy || "User",
        remark: "Deleted from IP Security",
      }),
      f: "MyAccount ( gettoken )",
    };
  
    try {
      await softDeleteIpSecurity(body);
      toast.success("IP deleted successfully");
      onRefresh();
    } catch (err) {
      toast.error(err?.message || "Failed to delete IP");
    }
  };  
  
  const handleDeleteClick = (ip) => {
    setConfirmPopup({
      open: true,
      ip,
    });
  };

  return (
    <>
      <button
        className="profile-edit-btn"
        style={{ marginBottom: "1.5%" }}
        onClick={() => setShowIpPopup(true)}
      >
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
            {ipData.map((ip, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{formatDateOnly(ip.EntryDate1) || "—"}</td>
                <td>{ip.IPAddress || "—"}</td>
                <td>{ip.isActive === 1 ? "Active" : ip.isActive === 0 ? "Inactive" : "—"}</td>
                <td>{ip.RequestBy || "—"}</td>
                <td>{ip.activateOn1 || "—"}</td>
                <td onClick={() => handleDeleteClick(ip)} style={{ cursor: "pointer" }}>
                  ❌
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      {confirmPopup.open && (
  <>
    <div className="confirm-overlay" />

    <div className="confirm-modal small">
      <h4>Delete IP</h4>
      <p>
        Are you sure you want to delete IP{" "}
        <strong>{confirmPopup.ip.IPAddress}</strong>?
      </p>

      <div className="confirm-actions">
        <button
          className="confirm-cancel"
          onClick={() =>
            setConfirmPopup({ open: false, ip: null })
          }
        >
          Cancel
        </button>

        <button
          className="confirm-delete"
          onClick={() => {
            handleDeleteIp(confirmPopup.ip);
            setConfirmPopup({ open: false, ip: null });
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </>
)}

    </>
  );
};

export default IPSecurity;
