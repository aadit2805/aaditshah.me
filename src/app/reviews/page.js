"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../lib/fontAwesome';

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
  document.body.setAttribute("data-theme", theme);
};

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const localStorageTheme = localStorage.getItem("theme");
    const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
    const currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

    setIsDarkMode(currentThemeSetting === "dark");
    updateThemeOnHtmlEl({ theme: currentThemeSetting });
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    updateThemeOnHtmlEl({ theme: newTheme });
    setIsDarkMode(!isDarkMode);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen transition-colors duration-0">
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="flex flex-col items-center justify-center text-center font-inter pt-24"> 
        <div className="w-full max-w-2xl px-4">
        <section className="mb-12">
            <h1 className="text-4xl font-semibold neon-orange-gradient">
             coming soon...
            </h1>
        </section>
        </div>
      </main>
    </div>
  );
}