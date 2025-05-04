'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const images: string[] = [
  'https://source.unsplash.com/random/800x600?sig=1',
  'https://source.unsplash.com/random/800x600?sig=2',
  'https://source.unsplash.com/random/800x600?sig=3',
  'https://source.unsplash.com/random/800x600?sig=4',
  'https://source.unsplash.com/random/800x600?sig=5',
  'https://source.unsplash.com/random/800x600?sig=6',
  'https://source.unsplash.com/random/800x600?sig=7',
  'https://source.unsplash.com/random/800x600?sig=8',
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const AnimatedImageGrid: React.FC = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((src, index) => (
        <motion.div
          key={index}
          className="rounded-xl overflow-hidden shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={index}
          variants={fadeUpVariants}
        >
          <Image
            src={src}
            alt={`Image ${index + 1}`}
            width={400}
            height={300}
            className="w-full h-auto object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedImageGrid;
