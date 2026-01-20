import React, { useState } from "react";
import "./IPSecurity.css";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { addIpSecurity } from "../../../../api/myAccountApi";
import { softDeleteIpSecurity } from "../../../../api/myAccountApi";

const IPSecurity = ({ setShowIpPopup, ipData, onRefresh, clientIp, LUId }) => {
  const [confirmPopup, setConfirmPopup] = useState({
    open: false,
    ip: null,
  });
  const [isAdding, setIsAdding] = useState(false);
  const [newIp, setNewIp] = useState({
    ip: "",
    requestBy: ""
  });
  const [ipError, setIpError] = useState("");
  const ipRegex =
    /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;


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

  const handleAddIp = async () => {
      if (!ipRegex.test(newIp.ip)) {
        setIpError("Enter a valid IP address");
      return;
    }

    if (!newIp.requestBy.trim()) {
      setIpError("Request By is required");
      return;
    }

    const body = {
      con: JSON.stringify({
        mode: "addIpSecurity",
        appuserid: LUId,
        IPAddress: clientIp,
      }),
      p: JSON.stringify({
        ipid: "0",
        newIpAddress: newIp.ip,
        appuserid: LUId,
        RequestBy: newIp.requestBy || "User",
        remark: "IP added from settings",
      }),
      f: "MyAccount ( gettoken )",
    };

    try {
      await addIpSecurity(body);
      toast.success("IP request added successfully");

      // setIsAdding(false);
      setNewIp({ ip: "", requestBy: "" });
      setIpError("");

      onRefresh();
    } catch (err) {
      toast.error(err?.message || "Failed to add IP");
    }
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

  const getTodayDate = () => {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <button
        className="profile-edit-btn"
        onClick={() => {
          setIsAdding(true);
          setNewIp({ ip: "", requestBy: "" });
          setIpError("");
        }}
      >
        + Add
      </button>

      {isAdding && (
        <div className="ip-add-card">
          <h4>Add IP Request</h4>

          <div className="ip-add-grid">
            <div>
              <label>Date</label>
              <input
                value={getTodayDate()}
                readOnly
              />
            </div>

            <div>
              <label>IP Address</label>
              <input
                value={newIp.ip}
                placeholder="e.g. 192.168.1.10"
                onChange={(e) =>
                  setNewIp((p) => ({ ...p, ip: e.target.value }))
                }
              />
            </div>

            <div>
              <label>Request By</label>
              <input
                value={newIp.requestBy}
                placeholder=""
                onChange={(e) =>
                  setNewIp((p) => ({ ...p, requestBy: e.target.value }))
                }
              />
            </div>
          </div>

          {ipError && <div className="error-text">{ipError}</div>}

          <div className="ip-add-actions">
            <button
              className="confirm-cancel"
              onClick={() => {
                setIsAdding(false);
                setNewIp({ ip: "", requestBy: "" });
                setIpError("");
              }}
            >
              Cancel
            </button>
            <button
              className="Ip-Proceed"
              onClick={handleAddIp}
              disabled={!newIp.ip || !newIp.requestBy}
            >
              Add IP
            </button>
          </div>
        </div>
      )}

      <div className="ip-table">
        <div className="ip-table-head">
          <div className="wdth ip-table-head-fnt">Sr</div>
          <div className="wdth1 ip-table-head-fnt">Entry Date</div>
          <div className="wdth2 ip-table-head-fnt">IP Address</div>
          <div className="wdth3 ip-table-head-fnt">Status</div>
          <div className="wdth4 ip-table-head-fnt">Request By</div>
          <div className="wdth5 ip-table-head-fnt">Activated On</div>
          <div className="wdth6 ip-table-head-fnt">Delete</div>
        </div>

        {ipData.map((ip, index) => (<>
          <div key={index} className="ip-table-body">
            <div className="wdth ip-table-body-fnt">{index + 1}</div>
            <div className="wdth1 ip-table-body-fnt">{formatDateOnly(ip.EntryDate1) || "—"}</div>
            <div className="wdth2 ip-table-body-fnt">{ip.IPAddress || "—"}</div>
            <div className="wdth3 ip-table-body-fnt ip-table-entry">
              {ip.isActive === 1 ? "Active" : ip.isActive === 0 ? "Inactive" : "—"}
            </div>
            <div className="wdth4 ip-table-body-fnt">{ip.RequestBy || "—"}</div>
            <div className="wdth5 ip-table-body-fnt">{ip.activateOn1 || "—"}</div>
            <div onClick={() => handleDeleteClick(ip)} style={{ cursor: "pointer" }} className="wdth6 ip-table-body-fnt">
              <FaTrashAlt color="#ff3b30" size={20} className="trash-icon" />
            </div>
          </div>
        </>
        ))}
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
