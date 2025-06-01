'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

import { variants } from '@/lib/utils'
const images = [
  '2.png',
  '7.png',
  '3.png',
  '4.png',
  '5.png',
  '6.png',
  '7.png',
  '8.png',
  '9.png',
  '8.png',
  '9.png',
]

const Page = () => {
  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: 'linear' }}
      className="container h-fit mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-1 gap-8 px-3 py-10 sm:py-15 md:py-20"
    >
      {images.map((image, index) => (
        <Image
          key={index}
          src={`/gallery/${image}`}
          alt="Gallery"
          className="w-full h-fit object-cover my-auto object-center shadow-[0px_2.14px_8.54px_0px_#0000004D,10.68px_10.68px_36.3px_0px_#00000026,0px_2.14px_7.47px_0px_#1F1E1359]"
          width={360}
          height={240}
        />
      ))}
    </motion.main>
  )
}

export default Page
