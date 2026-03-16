
"use client"

import { useState, useCallback } from "react"
import { Navigation } from "@/components/navigation"
import { UploadSection } from "@/components/upload-section"
import { TranscriptSection } from "@/components/transcript-section"
import { AnalysisSection } from "@/components/analysis-section"

export default function DashboardPage() {

  const [isProcessing, setIsProcessing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const [transcript, setTranscript] = useState<any[]>([])
  const [analysis, setAnalysis] = useState<any>(null)

  const handleFileUploaded = useCallback(async (file: File) => {

    console.log("File uploaded:", file.name)

    const allowedTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/mp4",
      "audio/webm",
      "audio/ogg",
      "text/plain"
    ]

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload an audio or txt file")
      return
    }

    setIsProcessing(true)

    try {

      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      console.log("API Result:", data)

      // Convert transcript string to display format
      const transcriptArray = [
        {
          speaker: "Speaker",
          timestamp: "00:00",
          text: data.transcript
        }
      ]

      setTranscript(transcriptArray)

      setAnalysis({
        summary: data.analysis,
        actionItems: [],
        participants: [],
        keyTopics: []
      })

      setShowResults(true)

    } catch (error) {

      console.error("Upload error:", error)
      alert("Error processing file")

    }

    setIsProcessing(false)

  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-3">
              Meeting Intelligence
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
              Upload meeting audio or transcript files and get AI insights
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">

            <UploadSection
              onFileUploaded={handleFileUploaded}
              isProcessing={isProcessing}
            />

            <TranscriptSection
              transcript={transcript}
              isVisible={showResults}
            />

            <AnalysisSection
              analysis={analysis}
              isVisible={showResults}
            />

          </div>

          {!showResults && !isProcessing && (
            <div className="mt-16 text-center">
              <p className="text-sm text-muted-foreground/60">
                Upload an audio or txt file to generate transcript and insights
              </p>
            </div>
          )}

        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-xs text-muted-foreground">
              Clarity AI Meeting Assistant
            </p>

            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Privacy
              </a>

              <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Terms
              </a>

              <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Help
              </a>
            </div>

          </div>

        </div>
      </footer>
    </div>
  )
}

