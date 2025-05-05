// pages/index.tsx
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type Offset = { x: number, y: number }

const getOffsetFromCenter = (el: HTMLElement, center: Offset) => {
  const rect = el.getBoundingClientRect()
  return {
    x: rect.left + rect.width / 2 - center.x,
    y: rect.top + rect.height / 2 - center.y
  }
}

// ⬇️ Grid item animation (bursting out from center)
const itemVariant = {
  hidden: (offset: Offset) => ({
    opacity: 0,
    scale: 0.5,
    x: -offset.x,
    y: -offset.y,
  }),
  show: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 40,
      damping: 18,
      duration: 2
    }
  }
}

// ⬇️ Portrait fades in before grid
const portraitVariant = {
  hidden: { opacity: 0, scale: 0.9, filter: 'grayscale(100%)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'grayscale(0%)',
    transition: { duration: .3 }
  }
}

export default function Home() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [center, setCenter] = useState<Offset>({ x: 0, y: 0 })
  const [startAnimation, setStartAnimation] = useState(false)

  useEffect(() => {
    const updateCenter = () => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect()
        setCenter({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
      }
    }
    updateCenter()
    window.addEventListener('resize', updateCenter)
    return () => window.removeEventListener('resize', updateCenter)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => setStartAnimation(true), 500) // delay burst start
    return () => clearTimeout(timeout)
  }, [])

  const blocks = [
    { key: 'header', content: (
      <>
        <span className="font-semibold text-neutral-700">JULIA HUANG</span>
        <nav className="space-x-4 text-sm text-neutral-600">
          <a href="#" className="hover:underline">PROJECTS</a>
          <a href="#" className="hover:underline">ABOUT</a>
          <a href="#" className="hover:underline">CONTACT</a>
        </nav>
      </>
    ), className: 'col-span-full flex justify-between items-center bg-[#fbe4df] p-4 rounded-xl' },

    { key: 'hero', content: (
      <h1 className="text-xl sm:text-2xl font-semibold leading-snug text-neutral-700">
        Artist Redefining <em className="italic font-normal text-neutral-600">Architecture</em> with <br /> AI-Driven Design
      </h1>
    ), className: 'bg-[#fbe4df] p-6 rounded-xl text-center flex items-center justify-center' },

    { key: 'portrait', content: (
      <motion.div
        className="w-full h-full"
        initial="hidden"
        animate="show"
        variants={portraitVariant}
      >
        <Image
          src="https://plus.unsplash.com/premium_photo-1671641753643-f26f5e811d57?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Portrait"
          width={400}
          height={500}
          className="w-full h-full object-cover"
        />
      </motion.div>
    ), className: 'sm:row-span-2 bg-[#fbe4df] rounded-xl overflow-hidden' },

    { key: 'museo', content: (
      <>
        <h2 className="font-semibold">Museo</h2>
        <Image
          src="https://source.unsplash.com/400x250/?interior,art"
          alt="Museo"
          width={400}
          height={250}
          className="mt-2 w-full h-32 object-cover rounded-md"
        />
        <span className="mt-2 text-sm text-neutral-600">Elora</span>
        <span className="text-sm text-neutral-600">Venus</span>
      </>
    ), className: 'bg-[#fbe4df] p-4 rounded-xl flex flex-col text-neutral-700' },

    { key: 'about', content: (
      <p>Julia Huang is an innovative AI artist, known for blending cutting-edge technology with creative expression. Based in LA.</p>
    ), className: 'bg-[#fbe4df] p-4 rounded-xl text-sm leading-relaxed text-neutral-600' },

    { key: 'contact', content: (
      <>Contact me →</>
    ), className: 'bg-[#f4bcb3] p-6 rounded-xl flex items-center justify-center text-lg font-semibold text-neutral-700 cursor-pointer hover:scale-105 transition' },

    { key: 'footer', content: (
      <>
        <span>INSTAGRAM</span>
        <span>TWITTER</span>
      </>
    ), className: 'col-span-full bg-[#fbe4df] p-4 rounded-xl flex justify-between text-sm text-neutral-600' },
  ]

  return (
    <main className="min-h-screen bg-[#f8c9c0] flex items-center justify-center p-4 overflow-hidden">
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-3 grid-rows-[auto_1fr_auto] gap-4 w-full max-w-6xl relative">
        {blocks.map((block, index) => {
          const isPortrait = block.key === 'portrait'
          return (
            <motion.div
              key={block.key}
              className={block.className}
              custom={
                !isPortrait && gridRef.current
                  ? getOffsetFromCenter(gridRef.current.children[index] as HTMLElement, center)
                  : { x: 0, y: 0 }
              }
              initial="hidden"
              animate={startAnimation && !isPortrait ? 'show' : undefined}
              variants={!isPortrait ? itemVariant : undefined}
              transition={{ delay: index * 1.5 }} // ~10s to 15s total stagger
            >
              {block.content}
            </motion.div>
          )
        })}
      </div>
    </main>
  )
}
