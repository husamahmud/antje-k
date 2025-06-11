'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

interface LensProps {
  children: React.ReactNode
  zoomFactor?: number
  lensSize?: number
  position?: {
    x: number
    y: number
  }
  isStatic?: boolean
  isFocusing?: () => void
  hovering?: boolean
  setHovering?: (hovering: boolean) => void
}

export const Lens: React.FC<LensProps> = ({ children, zoomFactor = 1.5, lensSize = 170, hovering, setHovering }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const [localIsHovering, setLocalIsHovering] = useState(false)

  const isHovering = hovering !== undefined ? hovering : localIsHovering
  const setIsHovering = setHovering || setLocalIsHovering

  // Initialize mouse position to the center of the container or default
  const [mousePosition, setMousePosition] = useState({ x: lensSize / 2, y: lensSize / 2 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
  }

  return (
    <div
      ref={containerRef}
      className="relative z-20"
      onMouseEnter={() => {
        setIsHovering(true)
      }}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
          >
            {/* The masked zoom content */}
            <div
              className="absolute inset-0 hidden md:block"
              style={{
                maskImage: `radial-gradient(circle ${lensSize / 2}px at ${mousePosition.x
                  }px ${mousePosition.y}px, black 100%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${mousePosition.x}px ${mousePosition.y
                  }px, black 100%, transparent 100%)`,
                transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                zIndex: 50,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  transform: `scale(${zoomFactor})`,
                  transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                }}
              >
                {children}
              </div>
            </div>

            {/* The border element */}
            <div
              className="pointer-events-none absolute shadow-2xl hidden md:block" // Prevent this div from capturing mouse events
              style={{
                width: lensSize,
                height: lensSize,
                borderRadius: '50%', // Make it circular
                border: '2px solid #ffffff6b', // Add your desired border style here
                top: mousePosition.y - lensSize / 2, // Position the center of the circle at the mouse Y
                left: mousePosition.x - lensSize / 2, // Position the center of the circle at the mouse X
                zIndex: 60, // Ensure border is above the masked content
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
