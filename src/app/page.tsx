"use client"

import Image from "next/image"
import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, EffectCoverflow } from "swiper/modules"

import { images } from "@/images"
import { Lens } from "@/components/ui/lens"
import { Button } from "@/components/ui/button"
import { Transition } from "@/components/transition"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-coverflow"

export default function Home() {
  const [hovering, setHovering] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <Transition className="flex flex-1 flex-col items-center justify-center">
      <div className="relative container mx-auto flex h-full flex-1 items-center justify-center">
        <Swiper
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet-custom",
            bulletActiveClass: "swiper-pagination-bullet-active-custom",
            renderBullet: (className) => `<span class="${className}"></span>`,
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          modules={[Pagination, Navigation, EffectCoverflow]}
          spaceBetween={30}
          className="w-full max-w-[1200px] pb-16"
          slidesPerView={1.3}
          centeredSlides={true}
          loop={true}
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
                <div className="flex h-full w-full flex-col gap-8 transform transition-all duration-500 ease-out">
                  <div className="flex items-center justify-between opacity-90 transition-opacity duration-300">
                    <p className="text-3xl font-semibold text-[#1F1E13] transition-all duration-300">{image.name}</p>
                    <p className="text-3xl text-[#1F1E13] transition-all duration-300">
                      {image.size[0]} <X /> {image.size[1]} <X /> {image.size[2]} &quot;
                    </p>
                  </div>

                  <div className="transform transition-all duration-500 ease-out hover:scale-[1.02] overflow-visible">
                    <div className="relative overflow-visible">
                      {/* Blurred background shadow with image colors - only for active slide */}
                      {index === activeIndex && (
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt=""
                          width={1067}
                          height={540}
                          className="absolute top-4 left-4 h-full w-full object-cover blur-xl opacity-60 scale-105 transition-all duration-500 ease-out"
                          style={{ filter: 'blur(20px) saturate(1.2)', zIndex: -1 }}
                        />
                      )}
                      
                      <Lens hovering={hovering} setHovering={setHovering}>
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.name}
                          width={1067}
                          height={540}
                          className="relative h-full w-full object-cover shadow-[0px_2.14px_8.54px_0px_#0000004D,10.68px_10.68px_36.3px_0px_#00000026,0px_2.14px_7.47px_0px_#1F1E1359] transition-all duration-500 ease-out"
                        />
                      </Lens>
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
          className="swiper-button-prev-custom absolute top-1/2 left-4 z-10 h-12 w-12 -translate-y-1/2 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:opacity-80 hover:drop-shadow-lg active:scale-95"
        >
          <Image
            src="/arrow-left.svg"
            alt="arrow-left"
            width={60}
            height={60}
            className="transition-transform duration-300 ease-in-out"
          />
        </button>
      </div>

      <div className="flex flex-col items-center gap-4 pb-5">
        <Button className="cursor-pointer font-source-serif overflow-hidden rounded-full border-2 border-white/20 bg-[linear-gradient(107.8deg,#505050_3.37%,#1D1D1D_95.93%)] px-12 py-6 text-[26px] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95">
          Buy now
        </Button>

        <a
          href="mailto:contact@antje-k.art"
          className="font-light font-source-serif text-[#828282] underline transition-colors duration-300 hover:text-[#1F1E13]"
        >
          contact@antje-k.art
        </a>
      </div>
    </Transition>
  )
}

const X = () => {
  return <span className="text-[#828282]">x</span>
}
