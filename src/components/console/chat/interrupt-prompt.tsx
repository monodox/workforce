"use client"

import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

interface InterruptPromptProps {
  isOpen: boolean
  close: () => void
}

export function InterruptPrompt({ isOpen, close }: InterruptPromptProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ top: 0, opacity: 0, filter: "blur(5px)" }}
          animate={{
            top: -40,
            opacity: 1,
            filter: "blur(0px)",
            transition: { type: "spring", filter: { type: "tween" } },
          }}
          exit={{ top: 0, opacity: 0, filter: "blur(5px)" }}
          className="absolute left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground shadow-sm"
        >
          <span>Press Enter again to interrupt</span>
          <button onClick={close} aria-label="Dismiss">
            <X className="h-3 w-3" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
