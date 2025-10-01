import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'
import { Concept, Audience } from '../../../types'

// GET /api/concepts - Get all concepts with their audiences
export async function GET() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({ concepts: [] })
    }

    const { data: concepts, error: conceptsError } = await supabase
      .from('concepts')
      .select(`
        *,
        audiences (
          id,
          name,
          age_range,
          gender,
          income,
          interests,
          location,
          education,
          lifestyle,
          created_at
        )
      `)
      .order('created_at', { ascending: false })

    if (conceptsError) {
      throw new Error(`Failed to fetch concepts: ${conceptsError.message}`)
    }

    const formattedConcepts = concepts?.map(concept => {
      const audience = concept.audiences as any
      return {
        id: concept.id,
        title: concept.title,
        description: concept.description,
        audienceId: concept.audience_id,
        audience: {
          id: audience.id,
          name: audience.name,
          ageRange: audience.age_range,
          gender: audience.gender,
          income: audience.income,
          interests: audience.interests,
          location: audience.location,
          education: audience.education,
          lifestyle: audience.lifestyle,
          createdAt: new Date(audience.created_at)
        },
        createdAt: new Date(concept.created_at),
      }
    }) || []

    return NextResponse.json({ concepts: formattedConcepts })
  } catch (error) {
    console.error('Error fetching concepts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch concepts' },
      { status: 500 }
    )
  }
}

// POST /api/concepts - Create new concept
export async function POST(request: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      // Return mock concept for demo purposes
      const conceptData = await request.json()
      return NextResponse.json({
        concept: {
          id: crypto.randomUUID(),
          ...conceptData,
          createdAt: new Date()
        }
      })
    }

    const conceptData = await request.json()

    const { data, error } = await supabase
      .from('concepts')
      .insert({
        id: conceptData.id || crypto.randomUUID(),
        title: conceptData.title,
        description: conceptData.description,
        audience_id: conceptData.audienceId,
        created_at: new Date().toISOString(),
      })
      .select(`
        *,
        audiences (
          id,
          name,
          age_range,
          gender,
          income,
          interests,
          location,
          education,
          lifestyle,
          created_at
        )
      `)
      .single()

    if (error) {
      throw new Error(`Failed to create concept: ${error.message}`)
    }

    const audience = data.audiences as any
    const concept: Concept = {
      id: data.id,
      title: data.title,
      description: data.description,
      audienceId: data.audience_id,
      audience: {
        id: audience.id,
        name: audience.name,
        ageRange: audience.age_range,
        gender: audience.gender,
        income: audience.income,
        interests: audience.interests,
        location: audience.location,
        education: audience.education,
        lifestyle: audience.lifestyle,
        createdAt: new Date(audience.created_at)
      },
      createdAt: new Date(data.created_at),
    }

    return NextResponse.json({ concept })
  } catch (error) {
    console.error('Error creating concept:', error)
    return NextResponse.json(
      { error: 'Failed to create concept' },
      { status: 500 }
    )
  }
}
