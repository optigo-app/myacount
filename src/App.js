import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import MyAccount from "./pages/MyAccount/MyAccount";
import OtpVerify from "./pages/OtpVerify";
import { bootstrapCNFromURL } from "./utils/cnBootstrap";
import { getIpAddress } from "./utils/getIpAddress";
import { devBootstrap } from "./utils/devBootstrap";
import { Toaster } from "react-hot-toast";
import { useMinDelay } from "./hooks/useMinDelay";
import AppLoader from "./components/loaders/Loader";
import { getRegisteredMobile } from "./api/myAccountApi";

const App = () => {
  const [bootstrapped, setBootstrapped] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [clientIp, setClientIp] = useState("");
  const minDelayDone = useMinDelay(500);
  const [registeredMobile, setRegisteredMobile] = useState("");

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
  
      try {
        const res = await getRegisteredMobile(ip, sessionStorage.getItem("LUId"));
        const mobile = res?.Data?.rd?.[0]?.mobileno || "";
        setRegisteredMobile(mobile);
      } catch (err) {
        console.error("Failed to fetch registered mobile", err);
      }
  
      setBootstrapped(true);
    };
  
    bootstrap();
  }, []);
  
  useEffect(() => {
    const clearOtp = () => {
      sessionStorage.removeItem("otp_verified");
    };
    window.addEventListener("blur", clearOtp);  
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        clearOtp();
      }
    });
  
    return () => {
      window.removeEventListener("blur", clearOtp);
      document.removeEventListener("visibilitychange", clearOtp);
    };
  }, []);

  if (!bootstrapped || !minDelayDone) {
    return <AppLoader text="Please Wait.." />;
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
            element={
              <OtpVerify 
                onOtpSuccess={() => setIsOtpVerified(true)}
                mobileNo={registeredMobile} 
              />
            }
          />
        </Routes>
      </HashRouter>
      <Toaster position="top-right" />
    </>
  );
};

export default App;