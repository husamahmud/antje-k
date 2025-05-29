'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';

const images = [
  {
    src: '/1.png',
    name: 'Image 1',
    size: [19.7, 7.9, 1.6],
    type: 'Acrylic & Oil Pastel'
  },
  {
    src: '/1.png',
    name: 'Image 1',
    size: [19.7, 7.9, 1.6],
    type: 'Acrylic & Oil Pastel'
  },
  {
    src: '/1.png',
    name: 'Image 1',
    size: [19.7, 7.9, 1.6],
    type: 'Acrylic & Oil Pastel'
  },
  {
    src: '/1.png',
    name: 'Image 1',
    size: [19.7, 7.9, 1.6],
    type: 'Acrylic & Oil Pastel'
  }
]

export default function Home() {
  return (
    <div className="container relative mx-auto px-3 flex-1 flex items-center justify-center h-full">
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        modules={[Pagination, Navigation]}
        spaceBetween={20}
        className='max-w-[1067px] w-full'
        slidesPerView={1}
        loop={true}
      >
        <div className='w-full'>
          {images.map((image) => (
            <SwiperSlide
              key={image.src}
              className='overflow-auto'
            >
              <div className='w-full h-full flex flex-col gap-8'>
                <div className='flex items-center justify-between'>
                  <p className='font-semibold text-3xl text-[#1F1E13]'>{image.name}</p>
                  <p className='text-[#1F1E13] text-3xl'>
                    {image.size[0]} <X /> {image.size[1]} <X /> {image.size[2]} "
                  </p>
                </div>

                <div className='px-4'>
                  <Image
                    src={image.src}
                    alt={image.name}
                    width={1067}
                    height={540}
                    className='w-full h-full object-cover'
                  />
                </div>

                <div className='flex justify-end'>
                  <p className='text-[#828282] text-3xl'>{image.type}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper >

      <button className='swiper-button-next-custom w-10 h-10 absolute right-0 top-1/2 cursor-pointer -translate-y-1/2'>
        <Image
          src='/arrow-right.svg'
          alt='arrow-right'
          width={60}
          height={60}
        />
      </button>
      <button className='swiper-button-prev-custom w-10 h-10 absolute left-0 top-1/2 cursor-pointer -translate-y-1/2'>
        <Image
          src='/arrow-left.svg'
          alt='arrow-left'
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