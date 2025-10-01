import { Audience, Concept } from '../types'

export async function generateConcept(audience: Audience): Promise<Omit<Concept, 'id' | 'audienceId' | 'audience' | 'createdAt'>> {
  try {
    const response = await fetch('/api/generate-concept', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ audience }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to generate concept')
    }

    const conceptData = await response.json()
    
    return {
      title: conceptData.title,
      description: conceptData.description
    }
  } catch (error) {
    console.error('Error generating concept:', error)
    throw new Error('Failed to generate concept. Please try again.')
  }
}
