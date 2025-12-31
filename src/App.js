import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyAccount from "./pages/MyAccount/MyAccount";
import OtpVerify from "./pages/OtpVerify";

const App = () => {

  function getBaseName() {
    const path = window.location.pathname;
    const match = path.match(/^\/([^/]+\/[^/]+)/);
    return match ? `/${match[1]}` : "/";
  }
  // console.log(getBaseName() , "url")
  return (
    <BrowserRouter basename="/myaccount">
      <Routes>
      <Route path="/otp-verify" element={<OtpVerify />} />

      <Route path="/" element={<MyAccount />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
