'use client'

import { useState } from 'react'
import { Concept } from '../types'
import { ApiService } from '../lib/api'
import { RefreshCw, Sparkles } from 'lucide-react'

interface ConceptListProps {
  concepts: Concept[]
  loading?: boolean
}

export function ConceptList({ concepts, loading = false }: ConceptListProps) {
  if (loading) {
    return (
      <div className="card text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Loading concepts...
        </h3>
        <p className="text-gray-500">
          Please wait while we fetch your concepts.
        </p>
      </div>
    )
  }

  if (concepts.length === 0) {
    return (
      <div className="card text-center py-12">
        <Sparkles className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No concepts yet
        </h3>
        <p className="text-gray-500">
          Create an audience and generate your first marketing concept to get started.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Generated Concepts ({concepts.length})
      </h3>
      
      <div className="space-y-4">
        {concepts.map((concept) => (
          <div key={concept.id} className="card">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-lg font-semibold text-gray-900">
                {concept.title}
              </h4>
            </div>
            
            <p className="text-gray-600 mb-4 leading-relaxed">
              {concept.description}
            </p>
            
            <div className="flex justify-between items-center text-xs text-gray-500">
              <div>
                <span className="font-medium">Target:</span> {concept.audience.name}
              </div>
              <div>
                {new Date(concept.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
