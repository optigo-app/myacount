import axios from "axios";
import { decodeCookieValue } from "../utils/decodeCookieValue";

export async function getMyAccountInfo(clientIp) {
    if (!clientIp) {
        throw new Error("Client IP missing");
    }

    const sessionKeys = Object.keys(sessionStorage);
    const cookieKey = sessionKeys.find(k => k.startsWith("RDSD_"));

    if (!cookieKey) {
        throw new Error("Session cookie not found");
    }

    const decoded = decodeCookieValue(sessionStorage.getItem(cookieKey));

    if (!decoded) {
        throw new Error("Failed to decode cookie");
    }
    
    const {
        rptapiurl,
        LUId,
        YearCode,
        cuVer,
        SV,
    } = decoded;

    const decodedYearCode = btoa(YearCode);

    const body = {
        "con": `{\"id\":\"\",\"mode\":\"getInfo\",\"appuserid\":\"${LUId ?? ''}\",\"IPAddress\":\"${clientIp}\"}`,
        "p": "{}",
        "f": "MyAccount ( gettoken )",
    };

    if (!rptapiurl || !LUId) {
        throw new Error("Session not initialized");
    }

    try {
        const response = await axios.post(rptapiurl, body, {
            headers: {
                YearCode: decodedYearCode,
                version: cuVer,
                sv: SV,
                sp: "106",
            },
        });

        return response.data;
    } catch (error) {
        console.error(
            "API ERROR:",
            error?.response?.data || error.message
        );
        throw error;
    }
}