"use client"

import { Sparkles, ListChecks, Users, Lightbulb } from "lucide-react"

interface AnalysisData {
  summary: string
  actionItems: string[]
  participants: string[]
  keyTopics: string[]
}

interface AnalysisSectionProps {
  analysis: AnalysisData
  isVisible: boolean
}

export function AnalysisSection({ analysis, isVisible }: AnalysisSectionProps) {
  if (!isVisible) return null

  return (
    <section className="w-full">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-foreground mb-1">AI Analysis</h2>
        <p className="text-sm text-muted-foreground">
          Key insights and action items from your meeting
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Summary Card */}
        <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-medium text-foreground">Summary</h3>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {analysis.summary}
          </p>
        </div>

        {/* Action Items Card */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
              <ListChecks className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-medium text-foreground">Action Items</h3>
          </div>
          <ul className="space-y-2.5">
            {analysis.actionItems.map((item, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <span className="h-5 w-5 rounded-md bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-muted-foreground">{index + 1}</span>
                </span>
                <span className="text-sm text-foreground/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Topics Card */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-medium text-foreground">Key Topics</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.keyTopics.map((topic, index) => (
              <span
                key={index}
                className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-muted rounded-lg"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Participants Card */}
        <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-medium text-foreground">Participants</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {analysis.participants.map((participant, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">
                    {participant.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <span className="text-sm text-foreground/80">{participant}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
