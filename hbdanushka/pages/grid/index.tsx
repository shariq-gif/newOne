// pages/index.tsx
import Image from 'next/image'
   import Link from 'next/link'
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
  const [randomImage, setRandomImage] = useState<string | null>(null)

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
    const timeout = setTimeout(() => setStartAnimation(true), 500)
    return () => clearTimeout(timeout)
  }, [])

  // Load random image from JSON
  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const res = await fetch('/gallery-data.json')
        const data = await res.json()
        const images = data.filter((item: any) => item.type === 'image')
        const random = images[Math.floor(Math.random() * images.length)]
        setRandomImage(random?.src || null)
      } catch (err) {
        console.error('Failed to load gallery data:', err)
      }
    }
    fetchRandomImage()
  }, [])

const blocks = [
  {
    key: 'header',
    content: (
      <>
        <span className="font-semibold text-xl text-neutral-700">Anushhkaaaaaa &lt;3</span>
        <nav className="space-x-4 text-sm text-neutral-600 flex flex-wrap justify-between sm:space-x-8 sm:flex-row flex-col mt-4 sm:mt-0">
          <Link href="/grid/affection" className="text-xl hover:underline mb-2 sm:mb-0">
            Affection
          </Link>
          <Link href="/grid/gallery" className="text-xl hover:underline mb-2 sm:mb-0">
            Gallery
          </Link>
          <Link href="/birthday/index.html" className="text-xl hover:underline mb-2 sm:mb-0">
            Birthday Wish
          </Link>
          <a href="/letter" className="text-xl hover:underline mb-2 sm:mb-0">Letter</a>
        </nav>
      </>
    ),
    className: 'col-span-full flex justify-between items-center bg-[#fbe4df] p-4 rounded-xl'
  },
    {
      key: 'hero',
      content: (
        <div className="text-xl sm:text-2xl font-semibold leading-snug text-neutral-700">
          <h1>
            Things I Like About this silly little Girl, <em className="italic font-bold underline text-neutral-600">Anushkaaa</em>
          </h1>
          <ul className="list-disc list-inside mt-4 space-y-1 text-lg sm:text-xl font-normal text-neutral-800">
            <li>Her Smile</li>
            <li>Her Eyes</li>
            <li>Her Hairs</li>
            <li>Her exceptionally distant and avoidant personality <span className="italic">(idk why don’t ask)</span></li>
            <li>Her Music Taste</li>
            <li>Her rare witty remarks</li>
            <li className="font-semibold">Overall Everything, I like everything about her…..</li>
          </ul>
        </div>
      ),
      className: 'bg-[#fbe4df] p-6 rounded-xl flex items-center justify-center'
    },

    {
  key: 'portrait',
  content: (
    <motion.div
      className="w-full h-full group relative overflow-hidden"
      initial="hidden"
      animate="show"
      variants={portraitVariant}
    >
      {/* IMAGE */}
      <Image
        src={randomImage || ''}
        alt="Portrait"
        width={400}
        height={500}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-sm group-hover:brightness-50"
      />

      {/* OVERLAY CAPTION */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-xl font-semibold text-center px-4">
          {/** You can replace this with dynamic caption if needed */}
          Anushka being her gorgeous self 💖
        </p>
      </div>
    </motion.div>
  ),
  className: 'sm:row-span-2 bg-[#fbe4df] rounded-xl overflow-hidden'
},

    {
      key: 'museo',
      content: (
        <>
          <h2 className="font-semibold">My Muse 👀</h2>
          <Image
            src="https://source.unsplash.com/400x250/?interior,art"
            alt="Museo"
            width={400}
            height={250}
            className="mt-2 w-full h-32 object-cover rounded-md"
          />
          <span className="mt-2 text-sm text-neutral-600">Her Eyes are the Prettiest Little Thing i have ever Seen</span>
          <span className="text-sm text-neutral-600">I wish I Could look at her like eyes, the way she is just so so perfect</span>
          <span>Teasing Anushka,
Yours avidly,
Shariq
</span>
        </>
      ),
      className: 'bg-[#fbe4df] p-4 rounded-xl flex flex-col text-neutral-700'
    },

    {
      key: 'about',
      content: (
        <p>
          Anushka is a girl who has lived her life in Karnal, She is smart, intelligent, funny, and
          Lives Out a pretty normal Life. She hates people, and she dont trust them easily, she gets
          blanked a lot(cute), Also She chose me so there's something clearly wrong with her.
        </p>
      ),
      className: 'bg-[#fbe4df] p-4 rounded-xl text-sm leading-relaxed text-neutral-600'
    },


{
  key: 'contact',
  content: (
    <Link href="/grid/gallery" className="w-full h-full flex items-center justify-center text-lg font-semibold text-neutral-700 cursor-pointer hover:scale-105 transition">
      Her Photo Gallery →
    </Link>
  ),
  className: 'bg-[#f4bcb3] p-6 rounded-xl'
},


    {
      key: 'footer',
      content: (
        <>
          <span>INSTAGRAM</span>
          <span>TWITTER</span>
        </>
      ),
      className: 'col-span-full bg-[#fbe4df] p-4 rounded-xl flex justify-between text-sm text-neutral-600'
    },
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
              transition={{ delay: index * 1.5 }}
            >
              {block.content}
            </motion.div>
          )
        })}
      </div>
    </main>
  )
}
