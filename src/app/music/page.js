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
        <section className="mb-12 w-full">
          <h1 className="text-4xl font-semibold">
            here is some of the <span className="neon-orange-gradient">music</span> i've been listening to lately!
          </h1>
          <div className="flex justify-center w-full mt-6">
            <iframe
              style={{ borderRadius: '12px', paddingLeft: '4rem' }}
              src="https://open.spotify.com/embed/playlist/2hJ9vjNCXEVrbPDmr8RRaY?utm_source=generator"
              width="50%"
              height="520"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
            <iframe
              style={{ borderRadius: '12px', paddingLeft: '2rem', paddingRight: '4rem' }}
              src="https://open.spotify.com/embed/playlist/2N0n81gJrPqZzFxeteHPUI?"
              width="50%"
              height="520"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </section>
      </main>
    </div>
  );
}
