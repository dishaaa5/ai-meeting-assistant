"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface TranscriptEntry {
  speaker: string
  timestamp: string
  text: string
}

interface TranscriptSectionProps {
  transcript: TranscriptEntry[]
  isVisible: boolean
}

export function TranscriptSection({ transcript, isVisible }: TranscriptSectionProps) {
  const [copied, setCopied] = useState(false)

  if (!isVisible) return null

  const handleCopy = () => {
    const fullText = transcript
      .map(entry => `[${entry.timestamp}] ${entry.speaker}: ${entry.text}`)
      .join("\n\n")
    navigator.clipboard.writeText(fullText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-medium text-foreground mb-1">Transcript</h2>
          <p className="text-sm text-muted-foreground">
            Full conversation with speaker labels
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground bg-secondary hover:bg-accent rounded-lg transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="space-y-6">
          {transcript.map((entry, index) => (
            <div key={index} className="group">
              <div className="flex items-baseline gap-3 mb-1.5">
                <span className="text-xs font-medium text-foreground bg-muted px-2 py-0.5 rounded-md">
                  {entry.speaker}
                </span>
                <span className="text-xs text-muted-foreground/60">{entry.timestamp}</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed pl-0.5">
                {entry.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
