'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'

import { images } from '@/images'
import { Lens } from '@/components/ui/lens'
import { Button } from '@/components/ui/button'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default function Home() {
  const [hovering, setHovering] = useState(false)

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="relative container mx-auto flex h-full flex-1 items-center justify-center">
        <Swiper
          pagination={{
            type: 'fraction',
          }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          // modules={[Navigation]}
          modules={[Pagination, Navigation]}
          spaceBetween={20}
          className="w-full max-w-[1067px]"
          slidesPerView={1}
          loop={true}
        >
          <div className="w-full">
            {images.map((image) => (
              <SwiperSlide
                key={image.src}
                className="overflow-auto overflow-y-hidden"
              >
                <div className="flex h-full w-full flex-col gap-8">
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-semibold text-[#1F1E13]">{image.name}</p>
                    <p className="text-3xl text-[#1F1E13]">
                      {image.size[0]} <X /> {image.size[1]} <X /> {image.size[2]} &quot;
                    </p>
                  </div>

                  <Lens
                    hovering={hovering}
                    setHovering={setHovering}
                  >
                    <Image
                      src={image.src}
                      alt={image.name}
                      width={1067}
                      height={540}
                      className="h-full w-full object-cover shadow-[0px_2.14px_8.54px_0px_#0000004D,10.68px_10.68px_36.3px_0px_#00000026,0px_2.14px_7.47px_0px_#1F1E1359]"
                    />
                  </Lens>

                  <div className="flex justify-end">
                    <p className="text-3xl text-[#828282]">{image.type}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>

        <button
          type="button"
          className="swiper-button-next-custom absolute top-1/2 right-0 h-10 w-10 -translate-y-1/2 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:opacity-80 hover:drop-shadow-lg"
        >
          <Image
            src="/arrow-right.svg"
            alt="arrow-right"
            width={60}
            height={60}
          />
        </button>
        <button
          type="button"
          className="swiper-button-prev-custom absolute top-1/2 left-0 h-10 w-10 -translate-y-1/2 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:opacity-80 hover:drop-shadow-lg"
        >
          <Image
            src="/arrow-left.svg"
            alt="arrow-left"
            width={60}
            height={60}
          />
        </button>
      </div>

      <div className="flex flex-col items-center gap-4 pb-5">
        <Button className="cursor-pointer font-source-serif overflow-hidden rounded-full border-2 border-white/20 bg-[linear-gradient(107.8deg,#505050_3.37%,#1D1D1D_95.93%)] px-12 py-6 text-[26px]">
          Buy now
        </Button>

        <a
          href="mailto:contact@antje-k.art"
          className="font-light font-source-serif text-[#828282] underline"
        >
          contact@antje-k.art
        </a>
      </div>
    </div>
  )
}

const X = () => {
  return <span className="text-[#828282]">x</span>
}
