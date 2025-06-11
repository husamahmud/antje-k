'use client'

import { Transition } from '@/components/transition'

const Page = () => {
  return (
    <Transition className="container mx-auto flex flex-1 flex-col items-center justify-center gap-6 px-4 pt-6 sm:gap-10 sm:px-6 md:px-8">
      <div className="font-dm-sans flex max-w-7xl flex-1 flex-col justify-center text-center">
        {/* Mobile-first responsive text sizing */}
        <div className="space-y-5 text-lg leading-relaxed font-extralight sm:space-y-11 sm:text-xl md:text-2xl lg:text-3xl">
          <p>
            Antje was born in Bremen, Lower Saxony, Germany, only a brief trip away from the Northern Sea. As it is, she
            came in touch early with the tide, endless horizons, fish and bad weather, all of which never lost their
            fascination on her.
          </p>

          <p>
            Most of her paintings combine a base of flowing or dripping aleatory techniques, a nod to the landscape she
            grew up in, with more traditional painting methods, oil pastel drawing or structural elements, sometimes
            even collage, to create dimension.
          </p>

          <p>She also dabbles in portraits once in a while, because people are fascinating.</p>
        </div>
      </div>

      <a
        href="mailto:antkrueg@icloud.com"
        className="font-source-serif pb-5 text-sm font-light text-[#828282] underline transition-colors duration-300 hover:text-[#1F1E13] sm:text-base md:text-lg"
      >
        antkrueg@icloud.com
      </a>
    </Transition>
  )
}

export default Page
