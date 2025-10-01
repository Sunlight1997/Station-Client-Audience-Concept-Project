'use client'

import { useState } from 'react'
import { Audience, Concept } from '../types'
import { ApiService } from '../lib/api'

interface ConceptGeneratorProps {
  audience: Audience
  onConceptGenerated: (concept: Concept) => void
}

export function ConceptGenerator({ audience, onConceptGenerated }: ConceptGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateConcept = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const conceptData = await ApiService.generateConcept(audience)

      console.log("concept, ", conceptData)
      
      // Save concept
      const savedConcept = await ApiService.createConcept({
        ...conceptData,
        audienceId: audience.id,
        audience: audience
      })

      onConceptGenerated(savedConcept)
    } catch (err) {
      console.error('Error generating concept:', err)
      setError('Failed to generate concept. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="floating-card card-hover">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Generate Marketing Concept
          </h3>
          <p className="text-sm text-gray-600">
            AI-powered concept creation
          </p>
        </div>
      </div>
      
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Target Audience:</h4>
        <p className="text-sm text-gray-600">{audience.name}</p>
        <div className="mt-2 text-xs text-gray-500 space-y-1">
          <p><span className="font-medium">Demographics:</span> {audience.ageRange}, {audience.gender}, {audience.income}</p>
          <p><span className="font-medium">Location:</span> {audience.location}</p>
          <p><span className="font-medium">Education:</span> {audience.education}</p>
          <p><span className="font-medium">Lifestyle:</span> {audience.lifestyle}</p>
          <p><span className="font-medium">Interests:</span> {audience.interests.join(', ')}</p>
        </div>
      </div>

      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <span className="font-medium">Note:</span> Using demo concepts due to API limitations. 
          In production, this would generate AI-powered concepts tailored to your audience.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <button
        onClick={handleGenerateConcept}
        disabled={isGenerating}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Generating Concept...</span>
          </div>
        ) : (
          'Generate Concept'
        )}
      </button>
    </div>
  )
}
