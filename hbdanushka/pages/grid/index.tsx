import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const tileVariants = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
};

export default function Home() {
  const portraitControls = useAnimation();
  const containerControls = useAnimation();

  useEffect(() => {
    portraitControls
      .start({
        x: [0, 20, 0],
        y: [0, -30, 0],
        transition: {
          duration: 1,
          ease: 'easeInOut',
          times: [0, 0.3, 1],
        },
      })
      .then(() => containerControls.start('show'));
  }, [portraitControls, containerControls]);

  return (
    <main className="min-h-screen bg-[#f9bdb3] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl space-y-6">
        {/* Top Header */}
        <motion.div
          className="flex justify-between items-center bg-[#f8dcd7] px-6 py-3 rounded-xl"
          variants={tileVariants}
          initial="hidden"
          animate={containerControls}
        >
          <span className="font-semibold text-lg text-neutral-800">JULIA HUANG</span>
          <nav className="space-x-6 text-sm text-neutral-700">
            <a href="#" className="hover:underline">PROJECTS</a>
            <a href="#" className="hover:underline">ABOUT</a>
            <a href="#" className="hover:underline">CONTACT</a>
          </nav>
        </motion.div>

        {/* Main Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 auto-rows-auto"
          variants={containerVariants}
          initial="hidden"
          animate={containerControls}
        >
          {/* Hero Text */}
          <motion.div
            className="bg-[#f8dcd7] p-6 rounded-xl col-span-1 sm:col-span-1"
            variants={tileVariants}
          >
            <h1 className="text-2xl font-bold text-neutral-900 leading-snug">
              Artist Redefining{' '}
              <span className="italic text-[#ce7b6e] font-medium">Architecture</span> with
              <br />
              AI-Driven Design
            </h1>
          </motion.div>

          {/* Portrait (key‑framed SW→NE→center) */}
          <motion.div
            className="row-span-2 flex justify-center items-center"
            initial={{ x: -200, y: 200 }}
            animate={portraitControls}
          >
            <div className="rounded-xl overflow-hidden w-full bg-white">
              <Image
                src="https://plus.unsplash.com/premium_photo-1671641753643-f26f5e811d57?q=80&w=3087&auto=format&fit=crop"
                alt="Portrait"
                width={400}
                height={500}
                className="w-full h-[500px] object-cover rounded-xl"
              />
            </div>
          </motion.div>

          {/* Project Card */}
          <motion.div
            className="bg-[#f8dcd7] p-4 rounded-xl text-neutral-800"
            variants={tileVariants}
          >
            <h2 className="font-semibold">Museo</h2>
            <Image
              src="https://source.unsplash.com/400x250/?interior,art"
              alt="Museo"
              width={400}
              height={250}
              className="mt-2 w-full h-32 object-cover rounded-md"
            />
            <div className="mt-2 space-y-1 text-sm text-neutral-700">
              <div>Elora</div>
              <div>Verve</div>
              <div>Zephyr</div>
            </div>
          </motion.div>

          {/* About Section */}
          <motion.div
            className="bg-[#f8dcd7] p-4 rounded-xl text-sm text-neutral-700 leading-relaxed"
            variants={tileVariants}
          >
            Julia Huang is an innovative AI artist, known for blending cutting-edge technology with creative expression. Based in LA.
          </motion.div>

          {/* Contact */}
          <motion.div
            className="bg-[#efaaa0] p-6 rounded-xl text-center text-white font-semibold cursor-pointer hover:scale-105 transition"
            variants={tileVariants}
          >
            Contact me →
          </motion.div>

          {/* Footer */}
          <motion.div
            className="col-span-1 sm:col-span-3 flex justify-between bg-[#f8dcd7] p-4 rounded-xl text-sm text-neutral-700"
            variants={tileVariants}
          >
            <span>INSTAGRAM</span>
            <span>TWITTER</span>
            <span>LINKEDIN</span>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
