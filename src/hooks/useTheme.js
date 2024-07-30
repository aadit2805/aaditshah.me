import { useState, useEffect } from 'react';

const calculateSettingAsThemeString = ({ localStorageTheme, systemSettingDark }) => {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
};

const updateThemeOnHtmlEl = ({ theme }) => {
  document.documentElement.setAttribute("data-theme", theme);
  document.body.setAttribute("data-theme", theme);
};

export const useTheme = () => {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const localStorageTheme = localStorage.getItem("theme");
    const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
    const currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

    setTheme(currentThemeSetting);
    updateThemeOnHtmlEl({ theme: currentThemeSetting });
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeOnHtmlEl({ theme: newTheme });
  };

  return { theme, toggleTheme, mounted };
};