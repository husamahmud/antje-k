'use client'

import { Transition } from '@/components/transition'

const Page = () => {
  return (
    <Transition className="container mx-auto flex flex-1 flex-col items-center justify-center gap-6 px-4 py-6 sm:gap-10 sm:px-6 md:px-8">
      <div className="font-dm-sans flex max-w-4xl flex-1 flex-col justify-center text-center">
        {/* Mobile-first responsive text sizing */}
        <div className="space-y-4 text-lg leading-relaxed font-extralight sm:space-y-6 sm:text-xl md:text-2xl lg:text-3xl">
          <p>
            Set against a tranquil light blue backdrop, cascading drips and delicate streaks of green, red, yellow,
            orange, and pink create a rhythmic vertical flow—evoking the graceful descent of rain or even the pulse of a
            heartbeat.
          </p>
          
          <p>
            The painting gives a sense of movement and fluidity, with the vertical lines resembling paint dripping down
            the canvas.
          </p>
          
          <p>A perfect statement for collectors seeking art that resonates with emotional elegant complexity.</p>
          
          <div className="pt-8 sm:pt-12 md:pt-16 lg:pt-20">
            <p>
              Set against a tranquil light blue backdrop, cascading drips and delicate streaks of green, red, yellow,
              orange, and pink create a rhythmic vertical flow—evoking the graceful descent of rain or even the pulse of a
              heartbeat.
            </p>
          </div>
        </div>
      </div>

      <a
        href="mailto:contact@antje-k.art"
        className="font-source-serif pb-5 text-sm font-light text-[#828282] underline transition-colors duration-300 hover:text-[#1F1E13] sm:text-base md:text-lg"
      >
        contact@antje-k.art
      </a>
    </Transition>
  )
}

export default Page
