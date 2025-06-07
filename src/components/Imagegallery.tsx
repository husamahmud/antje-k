'use client'

import React, { useState, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'

export interface Image {
  id: number
  src: string
  alt: string
  description: string
}

const Modal: React.FC<{ image: Image; originRect: DOMRect | null; onClose: () => void }> = React.memo(({
  image,
  originRect,
  onClose,
}) => {
  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }, [onClose])

  const initial = useMemo(() => ({
    x: originRect ? originRect.left + originRect.width / 2 - window.innerWidth / 2 : 0,
    y: originRect ? originRect.top + originRect.height / 2 - window.innerHeight / 2 : 0,
    scale: originRect ? originRect.width / window.innerWidth : 0.8,
  }), [originRect])

  return (
    <AnimatePresence>
      <motion.div
        className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        onTouchEnd={handleBackdropClick}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="relative h-full max-h-[90%] w-full max-w-4xl overflow-hidden"
          initial={initial}
          animate={{ scale: 1, x: 0, y: 0 }}
          exit={{ scale: initial.scale, x: initial.x, y: initial.y }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            duration: 0.5,
          }}
        >
          <div className="relative h-full w-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              style={{ objectFit: 'contain' }}
              quality={100}
              className="rounded-lg"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
})

Modal.displayName = 'Modal'

const ImageItem: React.FC<{
  image: Image;
  isSelected: boolean;
  onImageClick: (image: Image, ref: HTMLDivElement | null) => void;
}> = React.memo(({ image, isSelected, onImageClick }) => {
  const [imageRef, setImageRef] = useState<HTMLDivElement | null>(null)

  const handleClick = useCallback(() => {
    onImageClick(image, imageRef)
  }, [image, imageRef, onImageClick])

  return (
    <motion.div
      ref={setImageRef}
      className={`group relative my-auto w-full cursor-pointer overflow-hidden shadow-lg ${isSelected ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-300`}
      onClick={handleClick}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        className="h-auto w-full object-contain shadow-[0px_2.14px_8.54px_0px_#0000004D,10.68px_10.68px_36.3px_0px_#00000026,0px_2.14px_7.47px_0px_#1F1E1359] transition-opacity duration-300"
        width={0}
        height={0}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        style={{ width: '100%', height: 'auto' }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70" />
      <div className="bg absolute bottom-4 left-4 text-lg text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="font-semibold">{image.description}</p>
      </div>
    </motion.div>
  )
})

ImageItem.displayName = 'ImageItem'

const ImageGallery: React.FC<{ images: Image[] }> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)
  const [originRect, setOriginRect] = useState<DOMRect | null>(null)

  // Memoize mobile detection
  const isMobile = useMemo(() => {
    return typeof window !== 'undefined' && window.innerWidth < 640
  }, [])

  const handleImageClick = useCallback((image: Image, ref: HTMLDivElement | null) => {
    if (isMobile) {
      return // Do nothing on mobile
    }

    if (ref) {
      setOriginRect(ref.getBoundingClientRect())
    }
    setSelectedImage(image)
  }, [isMobile])

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null)
  }, [])

  const showModal = selectedImage && originRect && !isMobile

  return (
    <div className="flex w-full flex-col items-center p-4">
      <div className=" grid h-full w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
          <ImageItem
            key={image.id}
            image={image}
            isSelected={selectedImage?.id === image.id}
            onImageClick={handleImageClick}
          />
        ))}
      </div>
      {showModal && (
        <Modal
          image={selectedImage}
          originRect={originRect}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default ImageGallery
