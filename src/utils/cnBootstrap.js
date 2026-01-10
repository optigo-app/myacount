import { getCookieByName } from "./cookies";
import { decodeCookieValue } from "./decodeCookieValue";

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

  const rawCookieValue = getCookieByName(decodedCookieName);
  if (!rawCookieValue) {
    console.warn("[CN] Cookie not found:", decodedCookieName);
    sessionStorage.setItem("__CN_BOOTSTRAPPED__", "true");
    return;
  }

  const decodedCookieObject = decodeCookieValue(rawCookieValue);
  if (!decodedCookieObject) {
    console.error("[CN] Failed to decode cookie value");
    sessionStorage.setItem("__CN_BOOTSTRAPPED__", "true");
    return;
  }

  sessionStorage.setItem(
    decodedCookieName,
    JSON.stringify(decodedCookieObject)
  );

  console.log("[CN] Decoded cookie stored in sessionStorage", decodedCookieObject);

  sessionStorage.setItem("__CN_BOOTSTRAPPED__", "true");
}
