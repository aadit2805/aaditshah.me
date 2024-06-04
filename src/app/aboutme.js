// app/about-me/page.js
import Image from 'next/image'

export default function AboutMe() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-8 bg-black text-center font-inter">
      <section className="w-full max-w-4xl px-6 py-8 bg-gray-800 rounded-lg shadow-lg border-2 border-gray-700 transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl font-semibold mb-6 text-white">
          About Me
        </h1>
        <p className="text-xl mb-6 text-white">
          Hello! I'm Aadit, a student at Texas A&M University studying computer science and mathematics.
        </p>
        <p className="text-xl mb-6 text-white">
          I enjoy building applications and exploring new technologies. In my free time, I love to listen to music and connect with others in the tech community.
        </p>
        <Image
          src="/path/to/your/image.jpg" // replace with your image path
          alt="Aadit Shah"
          width={200}
          height={200}
          className="rounded-full mx-auto"
        />
      </section>
    </main>
  )
}
