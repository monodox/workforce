"use client"

import { motion } from "framer-motion"
import { FileText, Image, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FilePreviewProps {
  file: File
  onRemove: () => void
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  const isImage = file.type.startsWith("image/")

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2 text-xs"
    >
      {isImage ? (
        <Image className="h-4 w-4 text-muted-foreground" />
      ) : (
        <FileText className="h-4 w-4 text-muted-foreground" />
      )}
      <span className="max-w-[120px] truncate">{file.name}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-4 w-4 p-0"
        onClick={onRemove}
        aria-label={`Remove ${file.name}`}
      >
        <X className="h-3 w-3" />
      </Button>
    </motion.div>
  )
}
