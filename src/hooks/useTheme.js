import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Always set light theme
    document.documentElement.setAttribute("data-theme", "light");
    document.body.setAttribute("data-theme", "light");
    // Clean up any stored theme preference
    localStorage.removeItem("theme");
    setMounted(true);
  }, []);

  return { theme: 'light', mounted };
};