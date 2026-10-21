import { useEffect } from "react";
import { useLocation } from "react-router";

export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));

      if (target) {
        target.scrollIntoView();
        return;
      }
    }

    if (pathname) {
      window.scrollTo({ top: 0 });
    }
  }, [pathname, hash]);

  return null;
}
