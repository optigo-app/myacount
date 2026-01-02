import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCookieByName } from "../utils/cookies";

export const useCookieFromCN = () => {
  const [searchParams] = useSearchParams();
  const [cookieValue, setCookieValue] = useState(null);

  const cookieName = searchParams.get("CN");

  useEffect(() => {
    if (!cookieName) {
      setCookieValue(null);
      return;
    }

    const value = getCookieByName(cookieName);
    setCookieValue(value);
  }, [cookieName]);

  return {
    cookieName,
    cookieValue,
    hasCookie: Boolean(cookieValue),
  };
};
