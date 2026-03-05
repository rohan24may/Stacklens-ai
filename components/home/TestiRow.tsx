'use client';

import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

interface Testimonial {
  username: string;
  designation: string;
  text: string;
  image: string | StaticImageData;
}

interface TestiRowProps {
  data: Testimonial[];
  reverse?: boolean;
}

const TestiRow = ({ data, reverse = false }: TestiRowProps) => {
  // Animate horizontally instead of vertically
  const scrollAnim = reverse ? ['-50%', '0%'] : ['0%', '-50%'];

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex flex-row gap-5 w-max"
        animate={{ x: scrollAnim }}
        transition={{
          duration: 200,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {data.map((item, i) => (
          <div key={`${item.username}-${i}`} className="shrink-0">
            <div className="p-10 flex flex-col border border-white/10 items-center gap-y-2.5 rounded-xl bg-neutral-900/60 backdrop-blur min-w-[220px]">
              <Image
                src={item.image}
                alt={item.username}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div className="flex flex-col items-center">
                <span className="font-mono text-white">@{item.username}</span>
                <h1 className="font-mono text-sm text-white/70">{item.designation}</h1>
                <p className="text-center font-mono text-xs mt-2 ">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TestiRow;