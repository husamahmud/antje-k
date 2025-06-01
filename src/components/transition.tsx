import { motion } from "motion/react"
import { variants } from "@/lib/utils"

export const Transition = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: 'linear' }}
      className={className}
    >
      {children}
    </motion.main>
  )
}