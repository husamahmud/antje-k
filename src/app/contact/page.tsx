'use client'

import { motion } from 'motion/react'
import { variants } from '@/lib/utils'

const Page = () => {
  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: 'linear' }}
      className="container mx-auto flex flex-1 flex-col items-center justify-center gap-5"
    >
      <div className="font-source-serif">
        <p className="text-[26px] text-[#151515]">Reach Out:</p>

        <a
          href="mailto:contact@antje-k.art"
          className="text-[26px] font-light text-[#151515] underline"
        >
          contact@antje-k.art
        </a>
      </div>
    </motion.main>
  )
}

export default Page
