// src/app/page.js
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-8 bg-black text-center font-inter">
      <div className="flex flex-row w-full max-w-6xl px-4">
        <section className="w-1/2 px-6 py-8 bg-black rounded-lg shadow-lg border-2 border-gray-700 transform transition duration-500 hover:scale-105 mr-4">
          <h1 className="text-4xl font-semibold mb-6 text-white">
            howdy, i'm aadit!
          </h1>
          <p className="text-xl mb-6 text-white">
            i'm a student at texas a&m university studying computer science and mathematics.
          </p>
          <p className="text-xl mb-6 text-white">
            feel free to connect with me!
          </p>
          <div className="mt-8">
            <div className="flex justify-between items-center text-white mb-4">
              <FontAwesomeIcon icon="envelope" />
              <span className="font-medium ml-2">Email</span>
              <span className="flex-grow border-t border-dotted border-white mx-4"></span>
              <a href="mailto:aadit2805@gmail.com" className="text-blue-200 hover:underline">Send</a>
            </div>
            <div className="flex justify-between items-center text-white mb-4">
              <FontAwesomeIcon icon={['fab', 'github']} />
              <span className="font-medium ml-2">GitHub</span>
              <span className="flex-grow border-t border-dotted border-white mx-4"></span>
              <a href="https://github.com/aadit2805" className="text-blue-200 hover:underline">Follow</a>
            </div>
            <div className="flex justify-between items-center text-white mb-4">
              <FontAwesomeIcon icon={['fab', 'linkedin']} />
              <span className="font-medium ml-2">LinkedIn</span>
              <span className="flex-grow border-t border-dotted border-white mx-4"></span>
              <a href="https://linkedin.com/in/aadit2805" className="text-blue-200 hover:underline">Connect</a>
            </div>
            <div className="flex justify-between items-center text-white">
              <FontAwesomeIcon icon={['fab', 'twitter']} />
              <span className="font-medium ml-2">Twitter</span>
              <span className="flex-grow border-t border-dotted border-white mx-4"></span>
              <a href="https://twitter.com/aadit2805" className="text-blue-200 hover:underline">Follow</a>
            </div>
          </div>
        </section>

        <section className="w-1/2 px-6 py-8 bg-black rounded-lg shadow-lg border-2 border-gray-700 transform transition duration-500 hover:scale-105 ml-4">
          <p className="text-xl mb-6 text-white">
            here is some of the music i've been listening to lately!
          </p>
          <div className="flex justify-center mb-8">
            <iframe
              src="https://spotify-recently-played-readme.vercel.app/api?user=aadit2805&count=10"
              width="450"
              height="580"
              allow="encrypted-media"
              title="Spotify Recently Played"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        </section>
      </div>

      <footer className="text-center mt-12">
        <p className="text-white text-sm">&copy; 2024, Aadit Shah. All rights reserved.</p>
      </footer>
    </main>
  );
}
