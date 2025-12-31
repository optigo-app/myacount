import React, { useState } from "react";
import { addonsData } from "../../../data/data";

const Addons = () => {
  const activeAddons = addonsData.filter((addon) => addon.active);
  const inactiveAddons = addonsData.filter((addon) => !addon.active);

  return (
    <>
      {/* <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "80%", display: "flex", flexDirection: "column", }}>

          <div style={{ }}>
            <h1 style={{ marginBottom: "6px", fontSize: "38px" }}>Add-ons</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "20px" }}>
              Enhance your jewellery software with additional features
            </p>
          </div>

          {activeAddons.length > 0 && (
            <div style={{ padding: "0% 0% 2.5% 0%" }}>
              <h3 style={{ marginBottom: "20px", fontSize: "32px" }}>
                Your Add-ons
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  gap: "24px",
                }}
              >
                {activeAddons.map((addon) => (
                  <AddonCard key={addon.id} addon={addon} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div> */}
      <div
        style={{
          flex: 1,
          minHeight: "55vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "#f5f5f785",
            border: "1px solid #e5e5e7",
            borderRadius: "20px",
            padding: "48px 56px",
            maxWidth: "620px",
            textAlign: "center",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
          }}
        >

          {/* TITLE */}
          <div
            style={{
              fontSize: "30px",
              fontWeight: 600,
              color: "#1d1d1f",
              marginBottom: "12px",
            }}
          >
            Coming Soon
          </div>

          {/* DESCRIPTION */}
          <div
            style={{
              fontSize: "20px",
              color: "#6e6e73",
              lineHeight: "1.6",
            }}
          >
            We’re building powerful add-ons to extend your Optigo experience.
            This section will be available very soon.
          </div>
        </div>
      </div>

      {inactiveAddons.length > 0 && (
        <div style={{ background: "#f5f5f7", padding: "0.1% 9.90%", paddingBottom: "3%" }}>
          <h1 style={{ marginBottom: "12px", fontSize: "38px" }}>
            Available Add-ons
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "28px",
              margin: "0% 0.3%",
            }}
          >
            {inactiveAddons.map((addon) => (
              <AddonCard key={addon.id} addon={addon} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const PopupInput = ({ label, value, onChange, disabled, maxLength }) => (
  <div style={{ marginBottom: "14px" }}>
    <label
      style={{
        display: "block",
        fontSize: "18px",
        color: "#6e6e73",
        marginBottom: "6px",
      }}
    >
      {label}
    </label>
    <input
      value={value}
      disabled={disabled}
      maxLength={maxLength}
      onChange={(e) => onChange?.(e.target.value)}
      style={{
        width: "94%",
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid #d2d2d7",
        fontSize: "20px",
        background: disabled ? "#f5f5f7" : "#fff",
      }}
    />
  </div>
);

const AddonCard = ({ addon }) => {
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [selectedAddon, setSelectedAddon] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState({
    companyCode: "OPTIGO1234",
    firstName: "Smith",
    lastName: "Martinez",
    contactNo: "9510213581",
  });

  const handleCancel = () => {
    setShowRequestPopup(false);
    setSelectedAddon(null);
  };

  const handleSubmitAddon = () => {
    setShowRequestPopup(false);
    setShowToast(true);
  
    setTimeout(() => {
      setShowToast(false);
      setSelectedAddon(null);
    }, 3500);
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "8px",
        padding: "24px",
        border: "1px solid var(--border-light)",
        display: "flex",
        flexDirection: "column",
        minHeight: "275px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      }}
    >
      {addon.active && (
        <div
          style={{
            background: "#f5f5f7",
            padding: "16px 18px",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            margin: "-24px -24px 16px -24px",
          }}
        >
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "#e5e5ea",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
              }}
            >
              <img
                src={addon.icon}
                alt={addon.name}
                style={{
                  width: "36px",
                  height: "36px",
                  objectFit: "contain",
                  borderRadius: "8px"
                }}
              />
            </div>

            <div>
              <h3 style={{ margin: 0, fontSize: "21px" }}>{addon.name}</h3>
              <span style={{ fontSize: "18px", color: "#6e6e73" }}>
                {addon.subText}
              </span>
            </div>
          </div>
        </div>
      )}

      {!addon.active && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "14px",
            maxWidth: "430px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "#0071e3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "22px",
            }}
          >
            <img
              src={addon.icon}
              alt={addon.name}
              style={{
                width: "36px",
                height: "36px",
                objectFit: "contain",
                borderRadius: "8px"
              }}
            />
          </div>

          <h3 style={{ margin: 0, fontSize: "21px" }}>{addon.name}</h3>
        </div>
      )}

      {addon.descriptions ? (
        Array.isArray(addon.descriptions) ? (
          addon.descriptions.map((desc, index) => (
            <p
              key={index}
              style={{
                fontSize: "18px",
                color: "var(--text-secondary)",
                lineHeight: "1.6",
                marginBottom: "8px",
                margin: "0px",
              }}
            >
              {desc}
            </p>
          ))
        ) : (
          <p
            style={{
              fontSize: "18px",
              color: "var(--text-secondary)",
              lineHeight: "1.6",
              marginBottom: "16px",
              margin: "0px",
            }}
          >
            {addon.descriptions}
          </p>
        )
      ) : (
        <p
          style={{
            fontSize: "18px",
            color: "var(--text-secondary)",
            lineHeight: "1.6",
            marginBottom: "16px",
            margin: "0px",
          }}
        >
          {addon.description}
        </p>
      )}

      <div
        style={{
          marginTop: "auto",
          paddingTop: "14px",
          borderTop: "1px dashed var(--border-light)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {addon.active ? (
          <span
            style={{
              padding: "8px 18px",
              borderRadius: "20px",
              background: "rgba(0, 113, 227, 0.12)",
              color: "#0071e3",
              fontWeight: 600,
              fontSize: "18px",
            }}
          >
            Active
          </span>
        ) : (
          <button
            onClick={() => {
              setSelectedAddon(addon);
              setShowRequestPopup(true);
            }}
            style={{
              padding: "8px 22px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              background: "#0071e3",
              color: "#fff",
              fontWeight: 600,
              fontSize: "18px",
            }}
          >
            + Add
          </button>
        )}
      </div>
      {showRequestPopup && (
        <>
          {/* Overlay */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.35)",
              zIndex: 999,
            }}
            onClick={() => setShowRequestPopup(false)}
          />

          {/* Popup */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#fff",
              padding: "28px",
              borderRadius: "10px",
              width: "420px",
              zIndex: 1000,
            }}
          >
            <h3 style={{ margin: "0px", marginBottom: "16px", fontSize: "24px" }}>
              Request Add-on Access
            </h3>

            <PopupInput
              label="Company Code"
              value={formData.companyCode}
              disabled
            />

            <PopupInput
              label="First Name"
              value={formData.firstName}
              onChange={(v) =>
                setFormData({ ...formData, firstName: v })
              }
            />

            <PopupInput
              label="Last Name"
              value={formData.lastName}
              onChange={(v) =>
                setFormData({ ...formData, lastName: v })
              }
            />

            <PopupInput
              label="Contact No"
              value={formData.contactNo}
              onChange={(v) => {
                if (/^\d*$/.test(v)) {
                  setFormData({ ...formData, contactNo: v });
                }
              }}
              maxLength={10}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
                gap: "12px",
              }}
            >
              {/* CANCEL */}
              <button
                onClick={handleCancel}
                style={{
                  width: "50%",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "1px solid #d2d2d7",
                  background: "#f5f5f7",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              {/* SUBMIT */}
              <button
                onClick={handleSubmitAddon}
                style={{
                  width: "50%",
                  padding: "10px 26px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#0071e3",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
      {showToast && selectedAddon && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1d1d1f",
            color: "#fff",
            padding: "14px 24px",
            borderRadius: "12px",
            fontSize: "16px",
            zIndex: 1100,
            boxShadow: "0 5px 15px rgba(0,0,0,0.25)",
          }}
        >
          {/* {console.log(selectedAddon.name, "selectedAddon.name")} */}
          Your requset for {" "}
          <strong style={{ color: "#fff" }}>{selectedAddon.name}</strong> {" "}
          <span style={{ color: "#fff" }}>has been submitted successfully. Our team will contact you shortly.</span>
        </div>
      )}
    </div>

  );
};

export default Addons;