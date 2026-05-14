"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"

interface ChatFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  isPending: boolean
  handleSubmit: (event?: React.FormEvent) => void
  children: (props: {
    files: File[] | null
    setFiles: React.Dispatch<React.SetStateAction<File[] | null>>
  }) => React.ReactNode
}

export function ChatForm({
  className,
  isPending,
  handleSubmit,
  children,
  ...props
}: ChatFormProps) {
  const [files, setFiles] = useState<File[] | null>(null)

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    handleSubmit(event)
    setFiles(null)
  }

  return (
    <form
      className={cn("relative", className)}
      onSubmit={onSubmit}
      {...props}
    >
      {children({ files, setFiles })}
    </form>
  )
}
