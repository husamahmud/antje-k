'use client'

import Image from 'next/image'
import { useState, useRef, useCallback, useMemo, memo } from 'react'
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

// Memoized X component
const X = memo(() => {
  return <span className="text-[#828282]">x</span>
})
X.displayName = 'X'

// Memoized slide component
const SlideContent = memo(({
  image,
  index,
  activeIndex,
  hovering,
  setHovering,
  onSlideClick
}: {
  image: ImageData
  index: number
  activeIndex: number
  hovering: boolean
  setHovering: (hovering: boolean) => void
  onSlideClick: (index: number) => void
}) => {
  const isActive = index === activeIndex
  const shouldPreload = Math.abs(index - activeIndex) <= 2 // Preload current and adjacent images

  return (
    <div className="mx-auto flex h-full w-fit transform flex-col gap-8 overflow-visible transition-all duration-300 ease-out">
      <div className="flex items-center justify-between opacity-90 transition-opacity duration-200"
        style={{
          filter: !isActive ? 'blur(4px) saturate(1.2)' : 'none',
        }}
      >
        <p className="text-lg  md:text-3xl font-bold text-[#1F1E13] transition-all duration-200">{image.name}</p>
        <p className="text-lg md:text-3xl font-light text-[#1F1E13] transition-all duration-200">
          {image.size[0]} <X /> {image.size[1]} <X /> {image.size[2]}{' '}
          <span className="text-[#828282]">&quot;</span>
        </p>
      </div>

      <div className="transform overflow-visible transition-all duration-300 ease-out hover:scale-[1.02]">
        <div className="relative mx-auto flex h-[350px] w-fit items-center justify-center overflow-visible p-4 md:h-[550px] md:p-6">
          {/* Preload hidden images for faster navigation */}
          {shouldPreload && !isActive && (
            <Image
              src={image.src || '/placeholder.svg'}
              alt=""
              width={1067}
              height={540}
              quality={100}
              priority={index <= 2}
              unoptimized={true}
              className="absolute opacity-0 pointer-events-none"
              style={{ zIndex: -1 }}
            />
          )}

          {isActive && (
            <Image
              src={image.src || '/placeholder.svg'}
              alt=""
              width={1067}
              height={540}
              quality={50}
              className="absolute top-1/2 left-1/2 shadow-xl aspect-square max-h-[350px] w-fit max-w-full -translate-x-1/2 -translate-y-1/2 object-contain opacity-80 blur-xl transition-all duration-300 ease-out md:max-h-[550]"
              style={{ filter: 'blur(15px) saturate(1.6)', zIndex: 0 }}
            />
          )}

          {isActive ? (
            <Lens
              hovering={hovering}
              setHovering={setHovering}
            >
              <Image
                src={image.src || '/placeholder.svg'}
                alt={image.name}
                width={1067}
                quality={100}
                height={540}
                priority={true}
                unoptimized={true}
                className="z-10 aspect-square max-h-[350px] w-fit max-w-full object-contain transition-all duration-300 ease-out md:max-h-[550]"
              />
            </Lens>
          ) : (
            <Image
              src={image.src || '/placeholder.svg'}
              alt={image.name}
              width={1067}
              quality={50}
              height={540}
              priority={index <= 2}
              className="aspect-square max-h-[350px] opacity-70 w-fit max-w-full object-contain transition-all duration-300 ease-out md:max-h-[550]"
              style={{ filter: 'blur(4px) saturate(1.2)' }}
            />
          )}
        </div>
      </div>

      <div className="flex justify-end opacity-90 transition-opacity duration-200">
        <p className="text-lg  md:text-3xl font-light text-[#828282] transition-all duration-200"
          style={{
            filter: !isActive ? 'blur(4px) saturate(1.2)' : 'none',
          }}
        >{image.type}</p>
      </div>
    </div>
  )
})
SlideContent.displayName = 'SlideContent'

export const Slider = memo(({ images }: SliderProps) => {
  const [hovering, setHovering] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  const handleSlideClick = useCallback((index: number) => {
    if (index !== activeIndex && swiperRef.current) {
      swiperRef.current.slideTo(index)
    }
  }, [activeIndex])

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex)
  }, [])

  const handleSwiper = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper
  }, [])

  // Memoize swiper configuration
  const swiperConfig = useMemo(() => ({
    pagination: {
      clickable: true,
      bulletClass: 'swiper-pagination-bullet-custom',
      bulletActiveClass: 'swiper-pagination-bullet-active-custom',
      renderBullet: (index: number, className: string) => `<span class="${className}"></span>`,
    },
    modules: [Pagination, EffectCoverflow],
    spaceBetween: 10,
    className: "w-svw pb-16 overflow-visible",
    slidesPerView: 1.3 as const,
    centeredSlides: true,
    speed: 500, // Faster navigation
    effect: "coverflow" as const,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: false,
    },
    breakpoints: {
      640: {
        slidesPerView: 1.4,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 1.4,
        spaceBetween: 45,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
    }
  }), [])

  // Memoize slides
  const slides = useMemo(() =>
    images.map((image, index) => (
      <SwiperSlide
        key={image.src}
        className="mr-0 overflow-visible transition-all duration-300 ease-out"
        onClick={() => handleSlideClick(index)}
        style={{ cursor: index !== activeIndex ? 'pointer' : 'default' }}
      >
        <SlideContent
          image={image}
          index={index}
          activeIndex={activeIndex}
          hovering={hovering}
          setHovering={setHovering}
          onSlideClick={handleSlideClick}
        />
      </SwiperSlide>
    )), [images, activeIndex, hovering, setHovering, handleSlideClick]
  )

  return (
    <>
      <div className="relative mx-auto flex h-full flex-1 items-center justify-center overflow-visible">
        <Swiper
          {...swiperConfig}
          onSlideChange={handleSlideChange}
          onSwiper={handleSwiper}
        >
          <div className="w-full overflow-visible">
            {slides}
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
})
Slider.displayName = 'Slider'
