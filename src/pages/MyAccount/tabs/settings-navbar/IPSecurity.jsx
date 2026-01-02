import React from "react";
import "./IPSecurity.css";

const IPSecurity = ({ setShowIpPopup }) => {
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
};

export default IPSecurity;
