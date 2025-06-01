'use client'

import { Transition } from '@/components/transition'

const Page = () => {
  return (
    <Transition className="container mx-auto flex flex-1 flex-col items-center justify-center gap-5">
      <div className="font-source-serif">
        <p className="text-[26px] text-[#151515]">Reach Out:</p>

        <a
          href="mailto:contact@antje-k.art"
          className="text-[26px] font-light text-[#151515] underline"
        >
          contact@antje-k.art
        </a>
      </div>
    </Transition>
  )
}

export default Page
