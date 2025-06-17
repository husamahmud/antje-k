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

  // Optimized image quality for modal - high quality since it's the focus
  const imageQuality = useMemo(() => 90, []) // Reduced from 100 to 90 for faster loading

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
                width={1200}
                height={1200}
                className="max-h-[90vh] max-w-full object-contain"
                priority
                quality={imageQuality}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                unoptimized={false}
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
  index: number
  isPriority: boolean
}> = React.memo(({ image, onImageClick, isMobile, isPriority }) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleClick = useCallback(() => {
    if (!isMobile) {
      onImageClick?.(image)
    }
  }, [image, onImageClick, isMobile])

  const handleLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  // Memoized motion variants
  const itemVariants = useMemo(() => ({
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  }), [])

  // Optimized image configuration for faster loading
  const imageConfig = useMemo(() => ({
    width: isMobile ? 300 : 400,  // Reduced dimensions
    height: isMobile ? 180 : 240, // Reduced dimensions
    quality: isPriority ? 40 : 5   // Much lower quality for thumbnails
  }), [isMobile, isPriority])

  // More aggressive sizes optimization
  const imageSizes = useMemo(() => {
    if (isMobile) {
      return '100vw'
    }
    return '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw'
  }, [isMobile])

  // Memoized size string
  const sizeString = useMemo(() =>
    `${image.size[0]}x${image.size[1]}x${image.size[2]}mm`,
    [image.size]
  )

  // On mobile, render a simple div without motion or events
  if (isMobile) {
    return (
      <div className="group relative my-auto w-full">
        {/* Aspect ratio container to prevent layout shift */}
        <div className="relative w-full" style={{ aspectRatio: '5/3' }}>
          {/* Loading placeholder */}
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <NextImage
            src={image.src}
            alt={image.alt}
            className={`object-contain shadow-[6px_6px_14px_0px_#0000004f] transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'
              }`}
            width={imageConfig.width}
            height={imageConfig.height}
            style={{
              width: '100%',
              height: 'auto',
              // Ensure context menu is not disabled
              userSelect: 'auto',
              WebkitUserSelect: 'auto',
              WebkitTouchCallout: 'default'
            }}
            loading={isPriority ? 'eager' : 'lazy'}
            priority={isPriority}
            quality={imageConfig.quality}
            sizes={imageSizes}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            unoptimized={false}
            onLoad={handleLoad}
            // Remove any drag prevention to allow native context menu
            draggable={true}
          />
        </div>

        {/* Show description on mobile without hover effects */}
        <div className="mt-2 flex justify-between text-sm text-gray-700">
          <p className="font-semibold">{image.description}</p>
          <p className="font-semibold">{sizeString}</p>
        </div>
      </div>
    )
  }

  // Desktop version with motion and events
  return (
    <motion.div
      className="group relative my-auto w-full cursor-pointer"
      onClick={handleClick}
      variants={itemVariants}
      whileHover="hover"
      whileTap="tap"
      transition={{ duration: 0.05, ease: 'easeOut' }} // Faster transitions
    >
      {/* Aspect ratio container to prevent layout shift */}
      <div className="relative w-full">
        {/* Simplified loading placeholder */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 rounded-lg" />
        )}

        <NextImage
          src={image.src}
          alt={image.alt}
          className={`object-contain shadow-[6px_6px_14px_0px_#0000004f] ${isLoading ? 'opacity-0' : 'opacity-100'
            }`}
          width={imageConfig.width}
          height={imageConfig.height}
          style={{ width: '100%', height: 'auto' }}
          loading={isPriority ? 'eager' : 'lazy'}
          priority={isPriority}
          quality={imageConfig.quality}
          sizes={imageSizes}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          unoptimized={false}
          onLoad={handleLoad}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-75 group-hover:opacity-70" />
      <div className="absolute bottom-4 left-1/2 flex w-full px-5 -translate-x-1/2 justify-between text-lg text-white opacity-0 transition-opacity duration-75 group-hover:opacity-100">
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

  // Optimized image items with more aggressive priority loading
  const imageItems = useMemo(() =>
    images.map((image, index) => {
      // Set priority for first 4 images only (reduced from 6)
      const isPriority = index < 4

      return (
        <ImageItem
          key={image.id}
          image={image}
          onImageClick={isMobile ? undefined : handleImageClick}
          isMobile={isMobile}
          index={index}
          isPriority={isPriority}
        />
      )
    }),
    [images, handleImageClick, isMobile]
  )

  // More aggressive preloading strategy
  useEffect(() => {
    if (typeof window !== 'undefined' && images.length > 0) {
      // Preload first 4 images with very low quality
      images.slice(0, 4).forEach((image) => {
        const img = new Image()
        img.src = image.src
        img.loading = 'eager'
      })
    }
  }, [images])

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
