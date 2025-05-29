'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Image from 'next/image'
import { Lens } from '@/components/ui/lens'

const images = [
  {
    src: '/1.png',
    name: 'Image 1',
    size: [19.7, 7.9, 1.6],
    type: 'Acrylic & Oil Pastel',
  },
  {
    src: '/1.png',
    name: 'Image 1',
    size: [19.7, 7.9, 1.6],
    type: 'Acrylic & Oil Pastel',
  },
  {
    src: '/1.png',
    name: 'Image 1',
    size: [19.7, 7.9, 1.6],
    type: 'Acrylic & Oil Pastel',
  },
  {
    src: '/1.png',
    name: 'Image 1',
    size: [19.7, 7.9, 1.6],
    type: 'Acrylic & Oil Pastel',
  },
]

export default function Home() {
  const [hovering, setHovering] = useState(false)

  return (
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
              className="overflow-auto"
            >
              <div className="flex h-full w-full flex-col gap-8">
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-semibold text-[#1F1E13]">{image.name}</p>
                  <p className="text-3xl text-[#1F1E13]">
                    {image.size[0]} <X /> {image.size[1]} <X /> {image.size[2]} "
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
                    className="h-full w-full object-cover"
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
  )
}

const X = () => {
  return <span className="text-[#828282]">x</span>
}
