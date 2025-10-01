export interface Audience {
  id: string
  name: string
  ageRange: string
  gender: string
  income: string
  interests: string[]
  location: string
  education: string
  lifestyle: string
  createdAt: Date
}

export interface Concept {
  id: string
  title: string
  description: string
  audienceId: string
  audience: Audience
  createdAt: DataView
}

export interface ConceptGenerationRequest {
  audience: Audience
}
