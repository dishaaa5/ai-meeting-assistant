"use client"

import { useState, useCallback } from "react"
import { Upload, FileAudio, X, Loader2 } from "lucide-react"

interface UploadSectionProps {
  onFileUploaded: (file: File) => void
  isProcessing: boolean
}

export function UploadSection({ onFileUploaded, isProcessing }: UploadSectionProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setSelectedFile(file)
      onFileUploaded(file)
    }
  }, [onFileUploaded])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      onFileUploaded(file)
    }
  }, [onFileUploaded])

  const removeFile = useCallback(() => {
    setSelectedFile(null)
  }, [])

  return (
    <section className="w-full">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-foreground mb-1">Upload Recording</h2>
        <p className="text-sm text-muted-foreground">
          Add your meeting recording for transcription and analysis
        </p>
      </div>

      <div
        className={`
          relative rounded-2xl border-2 border-dashed transition-all duration-200
          ${dragActive 
            ? "border-foreground/40 bg-muted/50" 
            : "border-border hover:border-muted-foreground/30 bg-card"
          }
          ${selectedFile ? "p-6" : "p-12"}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                <FileAudio className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            {isProcessing ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Processing...</span>
              </div>
            ) : (
              <button
                onClick={removeFile}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">
              Drop your audio file here
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              MP3, WAV, M4A up to 500MB
            </p>
            <label className="cursor-pointer">
              <span className="px-4 py-2 text-sm font-medium text-foreground bg-secondary hover:bg-accent rounded-lg transition-colors">
                Browse files
              </span>
              <input
                type="file"
                accept="audio/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>
    </section>
  )
}
