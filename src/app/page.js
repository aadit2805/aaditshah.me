"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../components/nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../lib/fontAwesome';

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
              howdy, i'm aadit!
            </h1>
            <h1 className="text-4xl font-semibold mb-6">
              i'm a student at texas a&m studying computer science!
            </h1>
            <p className="text-xl mb-6">
              feel free to connect with me!
            </p>
          </section>
          <section className="mb-12">
            <div className="flex flex-col items-start">
              <div className="flex items-center mb-4 w-full">
                <FontAwesomeIcon icon="envelope" className="mr-2" />
                <span className="font-medium">Email</span>
                <span className={`flex-grow border-t border-dotted ${isDarkMode ? 'border-white' : 'border-gray-400'} mx-4`}></span>
                <a href="mailto:aadit2805@gmail.com" className={`${isDarkMode ? 'text-blue-200' : 'text-blue-600'} hover:underline`}>Send</a>
              </div>
              <div className="flex items-center mb-4 w-full">
                <FontAwesomeIcon icon={['fab', 'github']} className="mr-2" />
                <span className="font-medium">GitHub</span>
                <span className={`flex-grow border-t border-dotted ${isDarkMode ? 'border-white' : 'border-gray-400'} mx-4`}></span>
                <a href="https://github.com/aadit2805" className={`${isDarkMode ? 'text-blue-200' : 'text-blue-600'} hover:underline`}>Follow</a>
              </div>
              <div className="flex items-center mb-4 w-full">
                <FontAwesomeIcon icon={['fab', 'linkedin']} className="mr-2" />
                <span className="font-medium">LinkedIn</span>
                <span className={`flex-grow border-t border-dotted ${isDarkMode ? 'border-white' : 'border-gray-400'} mx-4`}></span>
                <a href="https://linkedin.com/in/aadit2805" className={`${isDarkMode ? 'text-blue-200' : 'text-blue-600'} hover:underline`}>Connect</a>
              </div>
              <div className="flex items-center w-full">
                <FontAwesomeIcon icon={['fab', 'twitter']} className="mr-2" />
                <span className="font-medium">Twitter</span>
                <span className={`flex-grow border-t border-dotted ${isDarkMode ? 'border-white' : 'border-gray-400'} mx-4`}></span>
                <a href="https://twitter.com/aadit2805" className={`${isDarkMode ? 'text-blue-200' : 'text-blue-600'} hover:underline`}>Follow</a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}