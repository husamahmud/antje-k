'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import NextImage from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { Transition } from './transition'
import { Lens } from './ui/lens'

export interface GalleryImage {
  id: number
  src: string
  alt: string
  description: string
}

const Modal: React.FC<{ image: GalleryImage; onClose: () => void }> = React.memo(({ image, onClose }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hovering, setHovering] = useState(false)

  const handleLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

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

  // Ensure we're on the client side before creating portal
  if (typeof window === 'undefined') {
    return null
  }

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-[#0000009e] backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          className="relative h-full max-h-[90vh] w-full max-w-4xl p-4"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-0 top-0 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/70 hover:scale-110"
            aria-label="Close modal"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <motion.div
            className="relative h-full w-full p-10 flex items-center justify-center"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.05 }}
          >
            {isLoading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="flex items-center space-x-3 text-zinc-100">
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full animate-spin" />
                  <span className="text-lg font-medium">Loading...</span>
                </div>
              </div>
            )}
            <Lens
              hovering={hovering}
              setHovering={setHovering}
            >
              <NextImage
                src={image.src}
                alt={image.alt}
                width={800}
                height={800}
                className="max-h-full max-w-full object-cover"
                priority
                onLoad={handleLoad}
              />
            </Lens>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
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
      className={`group relative my-auto w-full cursor-pointer overflow-hidden shadow-lg ${isSelected ? 'opacity-50' : 'opacity-100'
        } transition-opacity duration-200`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <NextImage
        src={image.src}
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
    <Transition className="flex w-full flex-col items-center p-4">
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
    </Transition>
  )
}

export default ImageGallery
