'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules'

import { Lens } from '@/components/ui/lens'
import { Button } from '@/components/ui/button'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'

type ImageData = {
  src: string
  name: string
  size: [number, number, number]
  type: string
}

type SliderProps = {
  images: ImageData[]
}

export function Slider({ images }: SliderProps) {
  const [hovering, setHovering] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <>
      <div className="relative container mx-auto flex h-full flex-1 items-center justify-center">
        <Swiper
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet-custom',
            bulletActiveClass: 'swiper-pagination-bullet-active-custom',
            renderBullet: (className) => `<span class="${className}"></span>`,
          }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          modules={[Pagination, Navigation, EffectCoverflow]}
          spaceBetween={30}
          className="w-full max-w-[1200px] pb-16"
          slidesPerView={1.3}
          centeredSlides={true}
          speed={800}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          breakpoints={{
            640: {
              slidesPerView: 1.1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1.2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 1.3,
              spaceBetween: 30,
            },
          }}
        >
          <div className="w-full">
            {images.map((image, index) => (
              <SwiperSlide
                key={image.src}
                className="overflow-visible transition-all duration-500 ease-out"
              >
                <div className="flex h-full w-full transform flex-col gap-8 transition-all duration-500 ease-out">
                  <div className="flex items-center justify-between opacity-90 transition-opacity duration-300">
                    <p className="text-3xl font-semibold text-[#1F1E13] transition-all duration-300">{image.name}</p>
                    <p className="text-3xl text-[#1F1E13] transition-all duration-300">
                      {image.size[0]} <X /> {image.size[1]} <X /> {image.size[2]} &quot;
                    </p>
                  </div>

                  <div className="transform overflow-visible transition-all duration-500 ease-out hover:scale-[1.02]">
                    <div className="relative flex h-[400px] w-full items-center justify-center overflow-visible md:h-[600px]">
                      {index === activeIndex && (
                        <Image
                          src={image.src || '/placeholder.svg'}
                          alt=""
                          width={1067}
                          height={540}
                          className="absolute top-1/2 left-1/2 max-h-[400px] max-w-full -translate-x-1/2 -translate-y-1/2 scale-105 object-contain opacity-60 blur-xl transition-all duration-500 ease-out md:max-h-[600px]"
                          style={{ filter: 'blur(20px) saturate(1.2)', zIndex: 0 }}
                        />
                      )}
                      {index === activeIndex ? (
                        <Lens
                          hovering={hovering}
                          setHovering={setHovering}
                        >
                          <Image
                            src={image.src || '/placeholder.svg'}
                            alt={image.name}
                            width={1067}
                            height={540}
                            className="z-10 max-h-[400px] max-w-full object-contain drop-shadow-[0px_2.14px_8.54px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out md:max-h-[600px]"
                          />
                        </Lens>
                      ) : (
                        <Image
                          src={image.src || '/placeholder.svg'}
                          alt={image.name}
                          width={1067}
                          height={540}
                          className="max-h-[400px] max-w-full object-contain drop-shadow-[0px_2.14px_8.54px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out md:max-h-[600px]"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end opacity-90 transition-opacity duration-300">
                    <p className="text-3xl text-[#828282] transition-all duration-300">{image.type}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>

        <button
          type="button"
          className="swiper-button-next-custom absolute top-1/2 right-4 z-10 h-12 w-12 -translate-y-1/2 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:opacity-80 hover:drop-shadow-lg active:scale-95"
        >
          <Image
            src="/arrow-right.svg"
            alt="arrow-right"
            width={60}
            height={60}
            className="transition-transform duration-300 ease-in-out"
          />
        </button>
        <button
          type="button"
          className="swiper-button-prev-custom absolute top-1/2 left-4 z-10 h-12 w-12 -translate-y-1/2 rotate-180 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:opacity-80 hover:drop-shadow-lg active:scale-95"
        >
          <Image
            src="/arrow-right.svg"
            alt="arrow-left"
            width={60}
            height={60}
            className="transition-transform duration-300 ease-in-out"
          />
        </button>
      </div>

      <div className="flex flex-col items-center gap-4 pb-5">
        <Button className="font-source-serif cursor-pointer overflow-hidden rounded-full border-2 border-white/20 bg-[linear-gradient(107.8deg,#505050_3.37%,#1D1D1D_95.93%)] px-12 py-6 text-[26px] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95">
          Buy now
        </Button>

        <a
          href="mailto:contact@antje-k.art"
          className="font-source-serif font-light text-[#828282] underline transition-colors duration-300 hover:text-[#1F1E13]"
        >
          contact@antje-k.art
        </a>
      </div>
    </>
  )
}

const X = () => {
  return <span className="text-[#828282]">x</span>
}
