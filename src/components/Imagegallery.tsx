'use client'

import React, { useState, useCallback, useMemo, useEffect } from 'react'
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
  size: [number, number, number]
}

// Memoized hook for mobile detection with resize handling
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 640
  })

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}

// Memoized download SVG icon
const DownloadIcon = React.memo(() => (
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
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
))
DownloadIcon.displayName = 'DownloadIcon'

// Memoized close SVG icon
const CloseIcon = React.memo(() => (
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
))
CloseIcon.displayName = 'CloseIcon'

// Memoized loading component
const LoadingSpinner = React.memo(() => (
  <div className="absolute inset-0 z-20 flex items-center justify-center">
    <div className="flex items-center space-x-3 text-zinc-100">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300" />
      <span className="text-lg font-medium">Loading...</span>
    </div>
  </div>
))
LoadingSpinner.displayName = 'LoadingSpinner'

// Add this helper function after the existing helper functions (around line 95)
const downloadImage = async (src: string, alt: string, id: number) => {
  try {
    const response = await fetch(src)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = alt || `image-${id}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error downloading image:', error)
  }
}

const Modal: React.FC<{ image: GalleryImage; onClose: () => void }> = React.memo(({ image, onClose }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hovering, setHovering] = useState(false)
  const isMobile = useIsMobile()

  const handleLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleDownload = useCallback(async () => {
    await downloadImage(image.src, image.alt, image.id)
  }, [image.src, image.alt, image.id])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  // Memoized motion variants for better performance
  const backdropVariants = useMemo(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  }), [])

  const modalVariants = useMemo(() => ({
    initial: { scale: 0.98, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.98, opacity: 0 }
  }), [])

  const contentVariants = useMemo(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  }), [])

  // Memoized image quality based on device
  const imageQuality = useMemo(() => isMobile ? 40 : 70, [isMobile])

  useEffect(() => {
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
    <AnimatePresence mode="wait">
      <motion.div
        className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-[#0000009e] backdrop-blur-md"
        style={{ willChange: 'opacity' }}
        variants={backdropVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.08, ease: 'easeOut' }}
      >
        <motion.div
          className="relative h-full max-h-[90%] w-full max-w-4xl p-4"
          style={{ willChange: 'transform, opacity' }}
          variants={modalVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.1, ease: 'easeOut' }}
        >
          {/* Download button */}
          <button
            onClick={handleDownload}
            className="absolute top-0 left-0 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-transform duration-100 hover:scale-110 hover:bg-black/70"
            style={{ willChange: 'transform' }}
            aria-label="Download image"
          >
            <DownloadIcon />
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-0 right-0 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-transform duration-100 hover:scale-110 hover:bg-black/70"
            style={{ willChange: 'transform' }}
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
          <motion.div
            className="relative flex h-full w-full items-center justify-center p-10"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.1 }}
          >
            {isLoading && <LoadingSpinner />}
            <Lens
              hovering={hovering}
              setHovering={setHovering}
            >
              <NextImage
                src={image.src}
                alt={image.alt}
                width={800}
                height={800}
                className="max-h-[90vh] max-w-full object-contain"
                priority
                quality={imageQuality}
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
  onImageClick?: (image: GalleryImage) => void
  isMobile: boolean
}> = React.memo(({ image, onImageClick, isMobile }) => {
  const [hovering, setHovering] = useState(false)

  const handleClick = useCallback(() => {
    if (!isMobile) {
      onImageClick?.(image)
    }
  }, [image, onImageClick, isMobile])

  // Memoized motion variants
  const itemVariants = useMemo(() => ({
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  }), [])

  // Memoized image dimensions and quality based on device
  const imageConfig = useMemo(() => ({
    width: isMobile ? 300 : 500,
    height: isMobile ? 200 : 300,
    quality: isMobile ? 15 : 30
  }), [isMobile])

  // Memoized size string
  const sizeString = useMemo(() =>
    `${image.size[0]}x${image.size[1]}x${image.size[2]}mm`,
    [image.size]
  )

  return (
          <motion.div
        className={`group relative my-auto w-full transition-transform duration-100 ${!isMobile ? 'cursor-pointer' : ''}`}
        style={{ willChange: 'transform' }}
        onClick={isMobile ? undefined : handleClick}
        variants={itemVariants}
        whileHover={!isMobile ? "hover" : undefined}
        whileTap={!isMobile ? "tap" : undefined}
        transition={{ duration: 0.1, ease: 'easeOut' }}
      >
      <Lens
        hovering={hovering}
        setHovering={setHovering}
      >
        <NextImage
          src={image.src}
          alt={image.alt}
          className="object-contain shadow-[6px_6px_14px_0px_#0000004f] transition-opacity duration-100"
          width={imageConfig.width}
          height={imageConfig.height}
          style={{ width: '100%', height: 'auto' }}
          loading="lazy"
          quality={imageConfig.quality}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          sizes={isMobile ? "(max-width: 640px) 100vw" : "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"}
        />
      </Lens>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-100 group-hover:opacity-70" />
      <div className="absolute bottom-4 left-1/2 flex w-full px-5 -translate-x-1/2 justify-between text-lg text-white opacity-0 transition-opacity duration-100 group-hover:opacity-100">
        <p className="font-semibold">{image.description}</p>
        <p className="font-semibold">{sizeString}</p>
      </div>
    </motion.div>
  )
})

ImageItem.displayName = 'ImageItem'

const ImageGallery: React.FC<{ images: GalleryImage[] }> = React.memo(({ images }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const isMobile = useIsMobile()

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

  // Memoized grid class names for better performance
  const gridClassName = useMemo(() =>
    "grid h-full w-full grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    []
  )

  // Memoized image items to prevent unnecessary re-renders
  const imageItems = useMemo(() =>
    images.map((image) => (
      <ImageItem
        key={image.id}
        image={image}
        onImageClick={isMobile ? undefined : handleImageClick}
        isMobile={isMobile}
      />
    )),
    [images, handleImageClick, isMobile]
  )

  return (
    <Transition className="flex w-full flex-col items-center overflow-x-hidden p-10 md:p-14">
      <div className={gridClassName} style={{ willChange: 'contents' }}>
        {imageItems}
      </div>
      {selectedImage && !isMobile && (
        <Modal
          image={selectedImage}
          onClose={handleCloseModal}
        />
      )}
    </Transition>
  )
})

ImageGallery.displayName = 'ImageGallery'

export default ImageGallery
