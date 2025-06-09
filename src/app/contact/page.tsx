'use client'

import { Transition } from '@/components/transition'

const Page = () => {
  return (
    <Transition className="container mx-auto flex flex-1 flex-col items-center justify-center gap-3 px-4 py-6 sm:gap-5 sm:px-6 md:px-8">
      <div className="font-source-serif text-center">
        {/* Mobile-first responsive text sizing */}
        <p className="text-xl font-light text-[#151515] opacity-75 sm:text-2xl md:text-[26px]">Reach Out:</p>

        <a
          href="mailto:antkrueg@icloud.com"
          className="text-xl font-medium text-[#151515] underline transition-colors duration-300 hover:text-[#828282] sm:text-2xl md:text-[26px]"
        >
          antkrueg@icloud.com
        </a>
      </div>
    </Transition>
  )
}

export default Page
