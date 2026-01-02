export const getCookieByName = (name) => {
    if (!name) return null;
  
    const cookies = document.cookie.split("; ");
  
    for (let cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  };
  