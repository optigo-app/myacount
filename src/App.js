import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import MyAccount from "./pages/MyAccount/MyAccount";
import OtpVerify from "./pages/OtpVerify";

const App = () => {
  const [bootstrapped, setBootstrapped] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  useEffect(() => {
    // 🔑 CN BOOTSTRAP (ONLY ONCE)
    if (!sessionStorage.getItem("__CN_BOOTSTRAPPED__")) {
      // 1️⃣ Try URL
      const { search, hash } = window.location;
      const params = new URLSearchParams(
        search || hash.replace("#", "?")
      );
      const CN = params.get("CN");

      if (CN) {
        sessionStorage.setItem("CN", CN);
      }

      sessionStorage.setItem("__CN_BOOTSTRAPPED__", "true");
    }

    const otp = sessionStorage.getItem("otp_verified") === "true";
    setIsOtpVerified(otp);

    setBootstrapped(true);
  }, []);

  if (!bootstrapped) {
    return <div>Initializing…</div>;
  }

  // console.log("[App] isOtpVerified =", isOtpVerified);

  return (
    <HashRouter>
      <Routes>
        <Route
          index
          element={
            isOtpVerified
              ? <MyAccount />
              : <Navigate to="/otp-verify" replace />
          }
        />
        <Route
          path="otp-verify"
          element={<OtpVerify onOtpSuccess={() => setIsOtpVerified(true)} />}
        />
      </Routes>
    </HashRouter>
  );
};

export default App;



// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import MyAccount from "./pages/MyAccount/MyAccount";
// import OtpVerify from "./pages/OtpVerify";

// const App = () => {
//   const [bootstrapped, setBootstrapped] = useState(false);

//   useEffect(() => {
//     // if (!sessionStorage.getItem("__APP_STARTED__")) {
//     //   sessionStorage.removeItem("otp_verified");
//     //   sessionStorage.setItem("__APP_STARTED__", "true");
//     // }

//     // CN bootstrap
//     const { search, hash } = window.location;
//     const params = new URLSearchParams(
//       search || hash.replace("#", "?")
//     );
//     const CN = params.get("CNnnnnnnnn");
//     if (CN) {
//       sessionStorage.setItem("CNnnnnnnnnnn", CN);
//     }

//     setBootstrapped(true);
//   }, []);

//   if (!bootstrapped) {
//     return <div>Initializing…</div>;
//   }

//   const isOtpVerified = sessionStorage.getItem("otp_verified") === "true";

//   return (
//     <BrowserRouter basename="/myaccount">
//       <Routes>
//         <Route
//           path="/"
//           element={
//             isOtpVerified
//               ? <MyAccount />
//               : <Navigate to="/otp-verify" replace />
//           }
//         />
//         <Route path="/otp-verify" element={<OtpVerify />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
