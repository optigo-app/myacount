import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import MyAccount from "./pages/MyAccount/MyAccount";
import OtpVerify from "./pages/OtpVerify";
import { bootstrapCNFromURL } from "./utils/cnBootstrap";
import { getIpAddress } from "./utils/getIpAddress";
import { devBootstrap } from "./utils/devBootstrap";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [bootstrapped, setBootstrapped] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [clientIp, setClientIp] = useState("");
  
  useEffect(() => {
    devBootstrap();
    bootstrapCNFromURL();
  }, []);

  useEffect(() => {
    const bootstrap = async () => {

      bootstrapCNFromURL();

      const ip = await getIpAddress();
      setClientIp(ip || "");

      const otp = sessionStorage.getItem("otp_verified") === "true";
      setIsOtpVerified(otp);

      setBootstrapped(true);
    };

    bootstrap();
  }, []);

  if (!bootstrapped) {
    return <div>Initializing…</div>;
  }

  // console.log("[App] isOtpVerified =", isOtpVerified);

  return ( 
    <>
      <HashRouter>
        <Routes>
          <Route
            index
            element={
              isOtpVerified
                ? <MyAccount clientIp={clientIp} />
                : <Navigate to="/otp-verify" replace />
            }
          />
          <Route
            path="otp-verify"
            element={<OtpVerify onOtpSuccess={() => setIsOtpVerified(true)} />}
          />
        </Routes>
      </HashRouter>
      <Toaster position="top-right" />
    </>
  );
};

export default App;