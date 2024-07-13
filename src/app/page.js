"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../components/nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'} transition-colors duration-300`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="flex flex-col items-center justify-center py-8 text-center font-inter">
        <div className="w-full max-w-2xl px-4">
          <section className="mb-12">
            <h1 className="text-4xl font-semibold mb-6 neon-orange-gradient">
              howdy, i'm aadit!
            </h1>
            <p className="text-xl mb-6">
              i'm a student at texas a&m university studying computer science and mathematics.
            </p>
            <p className="text-xl mb-6">
              feel free to connect with me!
            </p>
          </section>
          <section className="mb-12">
            <div className="flex flex-col items-start">
              <div className="flex items-center mb-4 w-full">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                <span className="font-medium">Email</span>
                <span className={`flex-grow border-t border-dotted ${isDarkMode ? 'border-white' : 'border-gray-400'} mx-4`}></span>
                <a href="mailto:aadit2805@gmail.com" className={`${isDarkMode ? 'text-blue-200' : 'text-blue-600'} hover:underline`}>Send</a>
              </div>
              <div className="flex items-center mb-4 w-full">
                <FontAwesomeIcon icon={faGithub} className="mr-2" />
                <span className="font-medium">GitHub</span>
                <span className={`flex-grow border-t border-dotted ${isDarkMode ? 'border-white' : 'border-gray-400'} mx-4`}></span>
                <a href="https://github.com/aadit2805" className={`${isDarkMode ? 'text-blue-200' : 'text-blue-600'} hover:underline`}>Follow</a>
              </div>
              <div className="flex items-center mb-4 w-full">
                <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
                <span className="font-medium">LinkedIn</span>
                <span className={`flex-grow border-t border-dotted ${isDarkMode ? 'border-white' : 'border-gray-400'} mx-4`}></span>
                <a href="https://linkedin.com/in/aadit2805" className={`${isDarkMode ? 'text-blue-200' : 'text-blue-600'} hover:underline`}>Connect</a>
              </div>
              <div className="flex items-center w-full">
                <FontAwesomeIcon icon={faTwitter} className="mr-2" />
                <span className="font-medium">Twitter</span>
                <span className={`flex-grow border-t border-dotted ${isDarkMode ? 'border-white' : 'border-gray-400'} mx-4`}></span>
                <a href="https://twitter.com/aadit2805" className={`${isDarkMode ? 'text-blue-200' : 'text-blue-600'} hover:underline`}>Follow</a>
              </div>
            </div>
          </section>
          <section className="mb-12">
            <p className="text-xl mb-6">
              here is some of the music i've been listening to lately!
            </p>
            <div className="flex justify-center">
              <iframe
                src="https://spotify-recently-played-readme.vercel.app/api?user=aadit2805&count=10"
                width="100%"
                height="580"
                allow="encrypted-media"
                title="Spotify Recently Played"
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
