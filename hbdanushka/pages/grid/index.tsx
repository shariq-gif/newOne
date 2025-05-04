// pages/index.tsx

import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8c9c0] flex items-center justify-center p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-[auto_1fr_auto] gap-4 w-full max-w-6xl">

        {/* Header */}
        <div className="col-span-full flex justify-between items-center bg-[#fbe4df] p-4 rounded-xl">
          <span className="font-semibold text-neutral-700">JULIA HUANG</span>
          <nav className="space-x-4 text-sm text-neutral-600">
            <a href="#" className="hover:underline">PROJECTS</a>
            <a href="#" className="hover:underline">ABOUT</a>
            <a href="#" className="hover:underline">CONTACT</a>
          </nav>
        </div>

        {/* Hero Text */}
        <div className="bg-[#fbe4df] p-6 rounded-xl text-center flex items-center justify-center">
          <h1 className="text-xl sm:text-2xl font-semibold leading-snug text-neutral-700">
            Artist Redefining <em className="italic font-normal text-neutral-600">Architecture</em> with <br /> AI-Driven Design
          </h1>
        </div>

        {/* Portrait Image */}
        <div className="sm:row-span-2 bg-[#fbe4df] rounded-xl overflow-hidden">
          <Image
            src="https://plus.unsplash.com/premium_photo-1671641753643-f26f5e811d57?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Portrait"
            width={400}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Visual Work Showcase */}
        <div className="bg-[#fbe4df] p-4 rounded-xl flex flex-col text-neutral-700">
          <h2 className="font-semibold">Museo</h2>
          <Image
            src="https://w0.peakpx.com/wallpaper/533/260/HD-wallpaper-cloud-pink-sky-u-16-9-background.jpg"
            alt="Museo"
            width={400}
            height={250}
            className="mt-2 w-full h-32 object-cover rounded-md"
          />
          <span className="mt-2 text-sm text-neutral-600">Elora</span>
          <span className="text-sm text-neutral-600">Venus</span>
        </div>

        {/* About */}
        <div className="bg-[#fbe4df] p-4 rounded-xl text-sm leading-relaxed text-neutral-600">
          Julia Huang is an innovative AI artist, known for blending cutting-edge technology with creative expression. Based in LA.
        </div>

        {/* Contact */}
        <div className="bg-[#f4bcb3] p-6 rounded-xl flex items-center justify-center text-lg font-semibold text-neutral-700 cursor-pointer hover:scale-105 transition">
          Contact me →
        </div>

        {/* Footer */}
        <div className="col-span-full bg-[#fbe4df] p-4 rounded-xl flex justify-between text-sm text-neutral-600">
          <span>INSTAGRAM</span>
          <span>TWITTER</span>
        </div>
      </div>
    </main>
  );
}
