'use client'

import React, { useState, useEffect } from 'react'
import { AudienceForm } from '../components/AudienceForm'
import { ConceptGenerator } from '../components/ConceptGenerator'
import { ConceptList } from '../components/ConceptList'
import { Audience, Concept } from '../types'
import { ApiService } from '../lib/api'

export default function Home() {
  const [audience, setAudience] = useState<Audience | null>(null)
  const [concepts, setConcepts] = useState<Concept[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadConcepts = async () => {
      try {
        const conceptsData = await ApiService.getConcepts()
        setConcepts(conceptsData)
      } catch (error) {
        console.error('Error loading concepts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadConcepts()
  }, [])

  const handleAudienceCreated = (newAudience: Audience) => {
    setAudience(newAudience)
  }

  const handleConceptGenerated = (newConcept: Concept) => {
    setConcepts(prev => [newConcept, ...prev])
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-8">
          <AudienceForm onAudienceCreated={handleAudienceCreated} />
          
          {audience && (
            <ConceptGenerator 
              audience={audience} 
              onConceptGenerated={handleConceptGenerated}
            />
          )}
        </div>

        <div>
          <ConceptList 
            concepts={concepts}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}
