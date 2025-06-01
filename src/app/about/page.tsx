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
      className="container mx-auto flex flex-1 flex-col items-center justify-center gap-10 text-center"
    >
      <div className="font-dm-sans flex max-w-7xl flex-1 flex-col justify-center text-3xl font-extralight">
        <p>
          Set against a tranquil light blue backdrop, cascading drips and delicate streaks of green, red, yellow,
          orange, and pink create a rhythmic vertical flow—evoking the graceful descent of rain or even the pulse of a
          heartbeat.
        </p>
        <br />
        <p>
          The painting gives a sense of movement and fluidity, with the vertical lines resembling paint dripping down
          the canvas.
        </p>
        <br />
        <p>A perfect statement for collectors seeking art that resonates with emotional elegant complexity.</p>
        <br />
        <p className="pt-20">
          Set against a tranquil light blue backdrop, cascading drips and delicate streaks of green, red, yellow,
          orange, and pink create a rhythmic vertical flow—evoking the graceful descent of rain or even the pulse of a
          heartbeat.
        </p>
      </div>

      <a
        href="mailto:contact@antje-k.art"
        className="font-source-serif pb-5 font-light text-[#828282] underline"
      >
        contact@antje-k.art
      </a>
    </motion.main>
  )
}

export default Page
