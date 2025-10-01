import { Audience, Concept } from '../types'

// API service for client-side operations
export class ApiService {
  private static baseUrl = '/api'

  // Audience operations
  static async createAudience(audience: Omit<Audience, 'id' | 'createdAt'>): Promise<Audience> {
    const response = await fetch(`${this.baseUrl}/audiences`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(audience),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to create audience')
    }

    const data = await response.json()
    return data.audience
  }

  static async getAudiences(): Promise<Audience[]> {
    const response = await fetch(`${this.baseUrl}/audiences`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to fetch audiences')
    }

    const data = await response.json()
    return data.audiences
  }

  // Concept operations
  static async createConcept(concept: Omit<Concept, 'id' | 'createdAt'>): Promise<Concept> {
    const response = await fetch(`${this.baseUrl}/concepts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(concept),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to create concept')
    }

    const data = await response.json()
    return data.concept
  }

  static async getConcepts(): Promise<Concept[]> {
    const response = await fetch(`${this.baseUrl}/concepts`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to fetch concepts')
    }

    const data = await response.json()
    return data.concepts
  }

  // Generate concept using AI
  static async generateConcept(audience: Audience): Promise<Omit<Concept, 'id' | 'audienceId' | 'audience' | 'createdAt'>> {
    const response = await fetch(`${this.baseUrl}/generate-concept`, {
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
  }
}
