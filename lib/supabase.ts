import { createClient } from '@supabase/supabase-js'
import { Audience, Concept } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      audiences: {
        Row: {
          id: string
          name: string
          age_range: string
          gender: string
          income: string
          interests: string[]
          location: string
          education: string
          lifestyle: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          age_range: string
          gender: string
          income: string
          interests: string[]
          location: string
          education: string
          lifestyle: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          age_range?: string
          gender?: string
          income?: string
          interests?: string[]
          location?: string
          education?: string
          lifestyle?: string
          created_at?: string
        }
      }
      concepts: {
        Row: {
          id: string
          title: string
          description: string
          audience_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          audience_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          audience_id?: string
          created_at?: string
        }
      }
    }
  }
}

// Convert database row to Audience type
function dbRowToAudience(row: Database['public']['Tables']['audiences']['Row']): Audience {
  return {
    id: row.id,
    name: row.name,
    ageRange: row.age_range,
    gender: row.gender,
    income: row.income,
    interests: row.interests,
    location: row.location,
    education: row.education,
    lifestyle: row.lifestyle,
    createdAt: new Date(row.created_at)
  }
}

// Convert database row to Concept type
function dbRowToConcept(row: Database['public']['Tables']['concepts']['Row'], audience: Audience): Concept {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    audienceId: row.audience_id,
    audience: audience,
    createdAt: new Date(row.created_at),
  }
}

// Save audience to database
export async function saveAudience(audience: Audience): Promise<Audience> {
  const { data, error } = await supabase
    .from('audiences')
    .insert({
      id: audience.id,
      name: audience.name,
      age_range: audience.ageRange,
      gender: audience.gender,
      income: audience.income,
      interests: audience.interests,
      location: audience.location,
      education: audience.education,
      lifestyle: audience.lifestyle,
      created_at: audience.createdAt.toISOString()
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to save audience: ${error.message}`)
  }

  return dbRowToAudience(data)
}

// Save concept to database
export async function saveConcept(concept: Omit<Concept, 'id' | 'createdAt'> & { id?: string; createdAt?: Date }): Promise<Concept> {
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Return mock concept for demo purposes
    return {
      id: concept.id || crypto.randomUUID(),
      title: concept.title,
      description: concept.description,
      audienceId: concept.audienceId,
      audience: concept.audience,
      createdAt: concept.createdAt || new Date(),
    }
  }

  const conceptId = concept.id || crypto.randomUUID()
  const createdAt = concept.createdAt || new Date()

  try {
    const { data, error } = await supabase
      .from('concepts')
      .insert({
        id: conceptId,
        title: concept.title,
        description: concept.description,
        audience_id: concept.audienceId,
        created_at: createdAt.toISOString(),
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to save concept: ${error.message}`)
    }

    return dbRowToConcept(data, concept.audience)
  } catch (error) {
    // Fallback: return concept without saving to database
    console.warn('Database not available, using local storage fallback:', error)
    return {
      id: conceptId,
      title: concept.title,
      description: concept.description,
      audienceId: concept.audienceId,
      audience: concept.audience,
      createdAt: createdAt,
    }
  }
}

// Get all concepts with their audiences
export async function getConcepts(): Promise<Concept[]> {
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Return empty array for demo purposes
    return []
  }

  try {
    const { data: concepts, error: conceptsError } = await supabase
      .from('concepts')
      .select('*')
      .order('created_at', { ascending: false })

    if (conceptsError) {
      throw new Error(`Failed to fetch concepts: ${conceptsError.message}`)
    }

    if (!concepts || concepts.length === 0) {
      return []
    }

    // Get all unique audience IDs
    const audienceIds = [...new Set(concepts.map(c => c.audience_id))]

    // Fetch all audiences
    const { data: audiences, error: audiencesError } = await supabase
      .from('audiences')
      .select('*')
      .in('id', audienceIds)

    if (audiencesError) {
      throw new Error(`Failed to fetch audiences: ${audiencesError.message}`)
    }

    // Create audience map
    const audienceMap = new Map(
      audiences?.map(audience => [audience.id, dbRowToAudience(audience)]) || []
    )

    // Combine concepts with their audiences
    return concepts.map(concept => {
      const audience = audienceMap.get(concept.audience_id)
      if (!audience) {
        throw new Error(`Audience not found for concept ${concept.id}`)
      }
      return dbRowToConcept(concept, audience)
    })
  } catch (error) {
    // Fallback: return empty array if database is not available
    console.warn('Database not available, returning empty concepts list:', error)
    return []
  }
}