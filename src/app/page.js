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
            <h1 className="text-4xl font-semibold neon-orange-gradient mb-6">
              Howdy, I'm Aadit!
            </h1>
            <p className="text-lg">
              I study at Texas A&M, majoring in Computer Science and Mathematics.
            </p>
            <p className="text-lg">
              Feel free to connect with me down below!
            </p>
          </section>
          <section className="mb-12">
            <div className="flex flex-col items-start">
              <div className="flex items-center mb-4 w-full">
                <FontAwesomeIcon icon="envelope" className="mr-2" />
                <span className="text-medium font-semibold">Email</span>
                <span className={`flex-grow border-t border-dotted ${isDarkMode ? 'border-white' : 'border-gray-400'} mx-4`}></span>
                <a href="mailto:aadit2805@gmail.com" className={`${isDarkMode ? 'text-white' : 'text-gray-400'}`}>Send</a>
              </div>
              <div className="flex items-center mb-4 w-full">
                <FontAwesomeIcon icon={['fab', 'github']} className="mr-2" />
                <span className="text-medium font-semibold">GitHub</span>
                <span className={`flex-grow border-t border-dotted ${isDarkMode ? 'border-white' : 'border-gray-400'} mx-4`}></span>
                <a href="https://github.com/aadit2805" className={`${isDarkMode ? 'text-white' : 'text-gray-400'}`}>Follow</a>
              </div>
              <div className="flex items-center mb-4 w-full">
                <FontAwesomeIcon icon={['fab', 'linkedin']} className="mr-2" />
                <span className="text-medium font-semibold">LinkedIn</span>
                <span className={`flex-grow border-t border-dotted ${isDarkMode ? 'border-white' : 'border-gray-400'} mx-4`}></span>
                <a href="https://linkedin.com/in/aadit2805" className={`${isDarkMode ? 'text-white' : 'text-gray-400'}`}>Connect</a>
              </div>
              <div className="flex items-center w-full">
                <FontAwesomeIcon icon={['fab', 'twitter']} className="mr-2" />
                <span className="font-medium">Twitter</span>
                <span className={`flex-grow border-t border-dotted ${isDarkMode ? 'border-white' : 'border-gray-400'} mx-4`}></span>
                <a href="https://twitter.com/aadit2805" className={`${isDarkMode ? 'text-white' : 'text-gray-400'}`}>Follow</a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}