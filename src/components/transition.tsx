import { motion } from "motion/react"

export const Transition = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      className={className}
    >
      {children}
    </motion.main>
  )
}

export const variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    filter: "blur(10px)"
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.05,
    filter: "blur(5px)",
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export const artworkVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  hover: {
    scale: 1.05,
    y: -10,
    rotateY: 5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

export const backgroundVariants = {
  initial: {
    background: "linear-gradient(45deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)"
  },
  animate: {
    background: [
      "linear-gradient(45deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)",
      "linear-gradient(45deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",
      "linear-gradient(45deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)"
    ],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear"
    }
  }
}
