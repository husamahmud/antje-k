'use client'

import React, { useState, useCallback, useMemo } from 'react'
import NextImage from 'next/image'
import { motion } from 'motion/react'

export interface GalleryImage {
  id: number
  src: string
  alt: string
  description: string
}

const Modal: React.FC<{ image: GalleryImage; onClose: () => void }> = React.memo(({ image, onClose }) => {
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    },
    [onClose]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [handleKeyDown])

  return (
    <div
      className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-[#0000009e] backdrop-blur-md"
      onClick={handleBackdropClick}
      onTouchEnd={handleBackdropClick}
    >
      <div className="relative h-full max-h-[90vh] w-full max-w-4xl p-4">
        <button
          onClick={onClose}
          className="bg-opacity-50 hover:bg-opacity-75 fixed top-4 right-4 z-20 cursor-pointer rounded-full bg-black p-3 text-white shadow-lg transition-colors"
          aria-label="Close modal"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div className="relative h-full w-full">
          <NextImage
            src={image.src || '/placeholder.svg'}
            alt={image.alt}
            fill
            style={{ objectFit: 'contain' }}
            quality={100}
            priority
          />
        </div>
      </div>
    </div>
  )
})

Modal.displayName = 'Modal'

const ImageItem: React.FC<{
  image: GalleryImage
  isSelected: boolean
  onImageClick: (image: GalleryImage) => void
}> = React.memo(({ image, isSelected, onImageClick }) => {
  const handleClick = useCallback(() => {
    onImageClick(image)
  }, [image, onImageClick])

  return (
    <motion.div
      className={`group relative my-auto w-full cursor-pointer overflow-hidden shadow-lg ${
        isSelected ? 'opacity-50' : 'opacity-100'
      } transition-opacity duration-200`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <NextImage
        src={image.src || '/placeholder.svg'}
        alt={image.alt}
        className="h-auto w-full object-contain shadow-[0px_2.14px_8.54px_0px_#0000004D,10.68px_10.68px_36.3px_0px_#00000026,0px_2.14px_7.47px_0px_#1F1E1359] transition-opacity duration-200"
        width={0}
        height={0}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        style={{ width: '100%', height: 'auto' }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-70" />
      <div className="absolute bottom-4 left-4 text-lg text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <p className="font-semibold">{image.description}</p>
      </div>
    </motion.div>
  )
})

ImageItem.displayName = 'ImageItem'

const ImageGallery: React.FC<{ images: GalleryImage[] }> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  // Memoize mobile detection
  const isMobile = useMemo(() => {
    return typeof window !== 'undefined' && window.innerWidth < 640
  }, [])

  const handleImageClick = useCallback(
    (image: GalleryImage) => {
      if (isMobile) {
        return // Do nothing on mobile
      }
      setSelectedImage(image)
    },
    [isMobile]
  )

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null)
  }, [])

  return (
    <div className="flex w-full flex-col items-center p-4">
      <div className="grid h-full w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
          <ImageItem
            key={image.id}
            image={image}
            isSelected={selectedImage?.id === image.id}
            onImageClick={handleImageClick}
          />
        ))}
      </div>
      {selectedImage && !isMobile && (
        <Modal
          image={selectedImage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default ImageGallery
