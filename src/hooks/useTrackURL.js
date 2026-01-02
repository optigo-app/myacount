import { useEffect, useState } from "react";

export const useTrackURL = () => {
  const [urlInfo, setUrlInfo] = useState({
    fullURL: "",
    pathname: "",
    search: "",
    hash: "",
    CN: null,
  });

  useEffect(() => {
    const updateURLInfo = () => {
      const { href, pathname, search, hash } = window.location;

      // Merge search params from URL + hash (important for your case)
      const searchParams = new URLSearchParams(search || hash.replace("#", "?"));

      setUrlInfo({
        fullURL: href,
        pathname,
        search,
        hash,
        CN: searchParams.get("CN"),
      });
    };

    updateURLInfo();

    // Track browser navigation (back/forward)
    window.addEventListener("popstate", updateURLInfo);

    return () => {
      window.removeEventListener("popstate", updateURLInfo);
    };
  }, []);

  return urlInfo;
};
