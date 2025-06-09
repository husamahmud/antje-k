'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectCoverflow } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

import { Lens } from '@/components/ui/lens'
import 'swiper/css'
import 'swiper/css/pagination'
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
  const swiperRef = useRef<SwiperType | null>(null)

  const handleSlideClick = (index: number) => {
    if (index !== activeIndex && swiperRef.current) {
      swiperRef.current.slideTo(index)
    }
  }

  return (
    <>
      <div className="relative mx-auto flex h-full flex-1 items-center justify-center overflow-visible">
        <Swiper
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet-custom',
            bulletActiveClass: 'swiper-pagination-bullet-active-custom',
            renderBullet: (className) => `<span class="${className}"></span>`,
          }}
          modules={[Pagination, EffectCoverflow]}
          spaceBetween={10}
          className="w-svw pb-16 overflow-visible"
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
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            640: {
              slidesPerView: 1.1,
              spaceBetween: 40,
            },
            768: {
              slidesPerView: 1.2,
              spaceBetween: 45,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
          }}
        >
          <div className="w-full overflow-visible">
            {images.map((image, index) => (
              <SwiperSlide
                key={image.src}
                className="mr-0 overflow-visible transition-all duration-500 ease-out"
                onClick={() => handleSlideClick(index)}
                style={{ cursor: index !== activeIndex ? 'pointer' : 'default' }}
              >
                <div className="mx-auto flex h-full w-fit transform flex-col gap-8 overflow-visible transition-all duration-500 ease-out">
                  <div className="flex items-center justify-between opacity-90 transition-opacity duration-300"
                    style={{
                      filter: index !== activeIndex ? 'blur(4px) saturate(1.2)' : 'none',
                    }}
                  >
                    <p className="text-3xl font-bold text-[#1F1E13] transition-all duration-300">{image.name}</p>
                    <p className="text-3xl font-light text-[#1F1E13] transition-all duration-300">
                      {image.size[0]} <X /> {image.size[1]} <X /> {image.size[2]}{' '}
                      <span className="text-[#828282]">&quot;</span>
                    </p>
                  </div>

                  <div className="transform overflow-visible transition-all duration-500 ease-out hover:scale-[1.02]">
                    <div className="relative mx-auto flex h-[350px] w-fit items-center justify-center overflow-visible p-4 md:h-[550px] md:p-6">
                      {index === activeIndex && (
                        <Image
                          src={image.src || '/placeholder.svg'}
                          alt=""
                          width={1067}
                          height={540}
                          quality={50}
                          className="absolute top-1/2 left-1/2 aspect-square max-h-[350px] w-fit max-w-full -translate-x-1/2 -translate-y-1/2 object-contain opacity-80 blur-xl transition-all duration-500 ease-out md:max-h-[550]"
                          style={{ filter: 'blur(22px) saturate(1.2)', zIndex: 0 }}
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
                            quality={50}
                            height={540}
                            className="z-10 aspect-square max-h-[350px] w-fit max-w-full object-contain transition-all duration-500 ease-out md:max-h-[550]"
                          />
                        </Lens>
                      ) : (
                        <Image
                          src={image.src || '/placeholder.svg'}
                          alt={image.name}
                          width={1067}
                          quality={50}
                          height={540}
                          className="aspect-square max-h-[350px] opacity-70 w-fit max-w-full object-contain transition-all duration-500 ease-out md:max-h-[550]"
                          style={{ filter: 'blur(4px) saturate(1.2)' }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end opacity-90 transition-opacity duration-300">
                    <p className="text-3xl font-light text-[#828282] transition-all duration-300"
                      style={{
                        filter: index !== activeIndex ? 'blur(4px) saturate(1.2)' : 'none',
                      }}
                    >{image.type}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>

      <div className="flex flex-col items-center gap-4 pb-5">
        <a
          href="mailto:antkrueg@icloud.com"
          className="font-source-serif font-light text-[#828282] underline transition-colors duration-300 hover:text-[#1F1E13]"
        >
          antkrueg@icloud.com
        </a>
      </div>
    </>
  )
}

const X = () => {
  return <span className="text-[#828282]">x</span>
}
