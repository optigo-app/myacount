import { getCookieByName } from "./cookies";

export function bootstrapCNFromURL() {
  // prevent re-running
  if (sessionStorage.getItem("__CN_BOOTSTRAPPED__") === "true") {
    return;
  }

  const { search, hash } = window.location;

  const params = new URLSearchParams(
    search || hash.replace("#", "?")
  );

  const cnFromUrl = params.get("CN");
  if (!cnFromUrl) {
    console.log("[CN] CN not found in URL");
    sessionStorage.setItem("__CN_BOOTSTRAPPED__", "true");
    return;
  }

  console.log("[CN] Raw CN from URL:", cnFromUrl);

  let decodedCookieName;
  try {
    decodedCookieName = atob(cnFromUrl);
  } catch (err) {
    console.error("[CN] Failed to decode CN:", err);
    sessionStorage.setItem("__CN_BOOTSTRAPPED__", "true");
    return;
  }

  console.log("[CN] Decoded cookie name:", decodedCookieName);

  const cookieValue = getCookieByName(decodedCookieName);
  if (!cookieValue) {
    console.warn("[CN] Cookie not found:", decodedCookieName);
    sessionStorage.setItem("__CN_BOOTSTRAPPED__", "true");
    return;
  }

  // 🔥 Store EXACT same key–value pair
  sessionStorage.setItem(decodedCookieName, cookieValue);

  console.log("[CN] Cookie copied to sessionStorage:", {
    key: decodedCookieName,
    value: cookieValue,
  });

  sessionStorage.setItem("__CN_BOOTSTRAPPED__", "true");
}
