'use client'

import { motion } from 'motion/react'
import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

// Context for managing transition direction
const TransitionContext = createContext<{
  direction: 'left' | 'right' | 'initial'
  setDirection: (direction: 'left' | 'right' | 'initial') => void
}>({
  direction: 'initial',
  setDirection: () => {},
})

// Define the route order for directional transitions
const routes = ['/', '/gallery', '/about', '/contact']

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [direction, setDirection] = useState<'left' | 'right' | 'initial'>('initial')
  const pathname = usePathname()
  const [previousPath, setPreviousPath] = useState<string | null>(null)

  useEffect(() => {
    if (previousPath === null) {
      // First load - show initial animation
      setDirection('initial')
      setPreviousPath(pathname)
      return
    }

    if (previousPath !== pathname) {
      const prevIndex = routes.indexOf(previousPath)
      const currentIndex = routes.indexOf(pathname)

      if (prevIndex !== -1 && currentIndex !== -1) {
        // Determine direction based on route order
        if (currentIndex > prevIndex) {
          setDirection('right') // Moving forward (e.g., home to gallery)
        } else {
          setDirection('left') // Moving backward (e.g., gallery to home)
        }
      } else {
        setDirection('right') // Default direction for unknown routes
      }

      setPreviousPath(pathname)
    }
  }, [pathname, previousPath])

  return <TransitionContext.Provider value={{ direction, setDirection }}>{children}</TransitionContext.Provider>
}

export const useTransition = () => {
  return useContext(TransitionContext)
}

export const Transition = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const { direction } = useTransition()

  return (
    <motion.main
      key={direction} // Force re-animation when direction changes
      variants={getVariants(direction)}
      initial="hidden"
      animate="enter"
      exit="exit"
      className={className}
    >
      {children}
    </motion.main>
  )
}

// Dynamic variants based on direction
const getVariants = (direction: 'left' | 'right' | 'initial') => {
  switch (direction) {
    case 'initial':
      return {
        hidden: {
          opacity: 0,
          y: 20,
          scale: 0.95,
          filter: 'blur(10px)',
        },
        enter: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            staggerChildren: 0.1,
          },
        },
        exit: {
          opacity: 0,
          y: -20,
          scale: 1.05,
          filter: 'blur(5px)',
          transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }

    case 'right':
      return {
        hidden: {
          opacity: 0,
          x: 100,
          filter: 'blur(8px)',
        },
        enter: {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
        exit: {
          opacity: 0,
          x: -100,
          filter: 'blur(8px)',
          transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }

    case 'left':
      return {
        hidden: {
          opacity: 0,
          x: -100,
          filter: 'blur(8px)',
        },
        enter: {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
        exit: {
          opacity: 0,
          x: 100,
          filter: 'blur(8px)',
          transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }
  }
}
