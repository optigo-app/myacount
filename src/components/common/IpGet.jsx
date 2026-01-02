export const getClientIpAddress = async () => {
    try {
      const cachedIp = sessionStorage.getItem("clientIpAddress");
      if (cachedIp) return cachedIp;
  
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      const ip = data?.ip || "";
  
      sessionStorage.setItem("clientIpAddress", ip);
      return ip;
    } catch (error) {
      console.error("Error fetching IP address:", error);
      return "";
    }
  };

/******************** Code From Jenis Sir ***********************/
import Cookies from "js-cookie";

export async function readAndDecodeCookie(cookieName) {
  const rawCookie = Cookies.get(cookieName);
  if (!rawCookie) return null;

  try {
    const decodedURI = decodeURIComponent(rawCookie);
    const parsedObj = JSON.parse(decodedURI);
    const safeBase64Decode = (val) => {
      if (typeof val !== "string") return val;
      try {
        const decoded = atob(val);
        return /^[\x09\x0A\x0D\x20-\x7E]*$/.test(decoded) ? decoded : val;
      } catch {
        return val;
      }
    };
    const result = Object.fromEntries(
      Object.entries(parsedObj).map(([key, value]) => {
        const decodedValue = safeBase64Decode(value);
        if (key === "YearCode" && typeof decodedValue === "string") {
          return [key, btoa(decodedValue)];
        }
        return [key, decodedValue];
      })
    );

    return result;
  } catch (err) {
    console.error("Failed to decode cookie:", err);
    return null;
  }
}

// http://localhost:3000/?CN=UkRTRF8yMDI1MTAwNzA0MDgyNF9kZGFmNzIwOGQ4MzY0ODE0YmZiNDE3MDkyNzg0YTdiMQ==&pid=18333

import { Route, Routes, useSearchParams } from "react-router-dom";
import "./App.scss";
import { useEffect, useState } from "react";
import ScanJob from "./component/Pages/ScanJob/ScanJob";
import DetailSection from "./component/Pages/DetailSection/DetailSection";
import { Box, Paper, Typography } from "@mui/material";
import { getClientIpAddress, readAndDecodeCookie } from "./Utils/globalFunc";
import { CallApi } from "./API/CallApi/CallApi";
import LoadingBackdrop from "./Utils/LoadingBackdrop";
import { AlertTriangle } from "lucide-react";

const App = () => {
  const [tokenMissing, setTokenMissing] = useState(false);
  const [searchParams] = useSearchParams();
  const CN = searchParams.get("CN");
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  //   useEffect(() => {
  //   Cookies.set(
  //     "RDSD_20251007040824_ddaf7208d8364814bfb417092784a7b1",
  //     "%7b%22tkn%22%3a%22OTA2NTQ3MTcwMDUzNTY1MQ%3d%3d%22%2c%22pid%22%3a18333%2c%22IsEmpLogin%22%3a0%2c%22IsPower%22%3a0%2c%22SpNo%22%3a%22MA%3d%3d%22%2c%22SpVer%22%3a%22%22%2c%22SV%22%3a%22MA%3d%3d%22%2c%22LId%22%3a%22MTg1Mzg%3d%22%2c%22LUId%22%3a%22amVuaXNAZWcuY29t%22%2c%22DAU%22%3a%22aHR0cDovL256ZW4vam8vYXBpLWxpYi9BcHAvQ2VudHJhbEFwaQ%3d%3d%22%2c%22YearCode%22%3a%22e3tuemVufX17ezIwfX17e29yYWlsMjV9fXt7b3JhaWwyNX19%22%2c%22cuVer%22%3a%22UjUwQjM%3d%22%2c%22rptapiurl%22%3a%22aHR0cDovL25ld25leHRqcy53ZWIvYXBpL3JlcG9ydA%3d%3d%22%7d"
  //   );
  // }, []);

  const Local =
    window.location.hostname === "localhost" ||
    window.location.hostname === "bulkengage.web" ||
    window.location.hostname === "nzen"
      ? true
      : false;

  const decodeBase64 = (str) => {
    if (!str) return null;
    try {
      return atob(str);
    } catch (e) {
      console.error("Error decoding base64:", e);
      return null;
    }
  };

  useEffect(() => {
    const init = async () => {
      const ip = await getClientIpAddress();
      if (!ip) {
        setTokenMissing(true);
        return;
      }
      const decodedCN = decodeBase64(CN);
      const getData = decodedCN ? sessionStorage.getItem(decodedCN) : null;
      if (Local) {
        const data = {
          tkn: "9065471700535651",
          pid: 18333,
          IsEmpLogin: 0,
          IsPower: 0,
          SpNo: "0",
          SpVer: "",
          SV: "0",
          LId: "5",
          LUId: "admin@orail.co.in",
          DAU: "http://nzen/jo/api-lib/App/CentralApi",
          YearCode: "e3tuemVufX17ezIwfX17e29yYWlsMjV9fXt7b3JhaWwyNX19",
          cuVer: "R50B3",
          rptapiurl: "http://newnextjs.web/api/report",
        };

        sessionStorage.setItem("reportVarible", JSON.stringify(data));
        setIsInitialized(true);
        return;
      }

      if (!CN && !getData) {
        setTokenMissing(true);
        return;
      }

      try {
        const cookieData = await readAndDecodeCookie(decodedCN);

        if (!cookieData && !getData) {
          setTokenMissing(true);
          return;
        }

        if (!getData && cookieData) {
          sessionStorage.setItem(decodedCN, JSON.stringify(cookieData));
        }

        sessionStorage.setItem(
          "reportVarible",
          cookieData ? JSON.stringify(cookieData) : getData
        );

        setIsInitialized(true);
      } catch (err) {
        console.error("Session init failed", err);
        setTokenMissing(true);
      }
    };

    init();
  }, [CN, Local]);

  useEffect(() => {
    if (!Local) {
      if (!isInitialized) return;
    }
    const fetchMasterData = async () => {
      try {
        const AllData = JSON.parse(sessionStorage.getItem("reportVarible"));
        const clientIpAddress = JSON.parse(
          sessionStorage.getItem("clientIpAddress")
        );
        if (!AllData?.LUId && !Local) {
          setTokenMissing(true);
          return;
        }
        setLoading(true);
        const lockerReq = {
          con: JSON.stringify({
            id: "",
            mode: "getlocker",
            appuserid: AllData?.LUId,
            IPAddress: clientIpAddress,
          }),
          p: "",
          f: "egmaterial (get lockermaster)",
        };

        const employeeReq = {
          con: JSON.stringify({
            id: "",
            mode: "getemplist",
            appuserid: AllData?.LUId,
            IPAddress: clientIpAddress,
          }),
          p: "",
          f: "getemplist (get getemplist)",
        };

        const empLockerReq = {
          con: JSON.stringify({
            id: "",
            mode: "getemplocker",
            appuserid: AllData?.LUId,
            IPAddress: clientIpAddress,
          }),
          p: "",
          f: "getemplist (get getemplist)",
        };

        const [lockerRes, employeeRes, empLockerRes] = await Promise.all([
          CallApi(lockerReq),
          CallApi(employeeReq),
          CallApi(empLockerReq),
        ]);

        if (lockerRes?.rd) {
          sessionStorage.setItem("allLockerData", JSON.stringify(lockerRes.rd));
        }

        if (employeeRes?.rd) {
          sessionStorage.setItem(
            "allEmployeeData",
            JSON.stringify(employeeRes.rd)
          );
        }

        if (empLockerRes?.rd) {
          sessionStorage.setItem(
            "allEmployeeLockerData",
            JSON.stringify(empLockerRes.rd)
          );
        }
        setLoading(false);
      } catch (err) {
        console.error("Master data fetch failed", err);
      } finally {
      }
    };

    fetchMasterData();
  }, [isInitialized, Local]);
  
  if (tokenMissing && !Local) {
    return (
      <Box display="flex" justifyContent="center" minHeight="70vh" p={2}>
        <Paper
          elevation={3}
          sx={{
            maxWidth: 500,
            width: "100%",
            p: 4,
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <Box display="flex" justifyContent="center" mb={2}>
            <AlertTriangle size={48} color="#f44336" />
          </Box>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            You've been logged out
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your session has ended. Please log in again to continue.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <>
      <LoadingBackdrop isLoading={loading} />
      <Routes>
        <Route path="/" element={<ScanJob />} />
        <Route path="/DetailSection" element={<DetailSection />} />
      </Routes>
    </>
  );
};

export default App;