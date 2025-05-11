import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link'; // Import Link from next

interface Photo {
  src: string;
  width: number;
  height: number;
  caption?: string;
  type: 'image' | 'video';
}

const Gallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/gallery-data.json');
        const data = await res.json();
        setPhotos(data);
      } catch (err) {
        console.error('Error loading gallery data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Anushka's Pinterest 💖</title>
      </Head>
      <main className="min-h-screen bg-[#f8c9c0] py-12 px-4 sm:px-8">
        <div className="mb-10 flex items-center space-x-2">
           <Link href="/grid" className="text-xl text-neutral-700 hover:text-neutral-900">
            <span className="inline-block transform rotate-180">&#8594;</span> {/* This is a simple left arrow */}
          </Link>
          <h1 className="text-3xl font-bold text-center text-neutral-700 flex-1">
            Anushka's Pinterest 💖
          </h1>
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.length > 0 ? (
            photos.map((photo, index) => (
              <motion.div
  key={index}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
  whileHover={{ scale: 1.03 }}
  className="relative break-inside-avoid overflow-hidden rounded-xl shadow-lg group"
>
  {photo.type === 'image' ? (
    <Image
      src={photo.src}
      alt={`Photo ${index + 1}`}
      width={photo.width}
      height={photo.height}
      className="w-full h-auto object-cover transition-transform duration-300"
    />
  ) : (
    <video
      src={photo.src}
      width={photo.width}
      height={photo.height}
      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
      autoPlay
      muted
      loop
      playsInline
    />
  )}

  <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-sm px-3 py-2 translate-y-full group-hover:translate-y-0 transition-all duration-300">
    {photo.caption}
  </div>
</motion.div>

            ))
          ) : (
            <p>Loading gallery...</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Gallery;
