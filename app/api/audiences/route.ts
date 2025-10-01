import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'
import { Audience } from '../../../types'

// GET /api/audiences - Get all audiences
export async function GET() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({ audiences: [] })
    }

    const { data, error } = await supabase
      .from('audiences')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch audiences: ${error.message}`)
    }

    const audiences = data?.map(row => ({
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
    })) || []

    return NextResponse.json({ audiences })
  } catch (error) {
    console.error('Error fetching audiences:', error)
    return NextResponse.json(
      { error: 'Failed to fetch audiences' },
      { status: 500 }
    )
  }
}

// POST /api/audiences - Create new audience
export async function POST(request: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      // Return mock audience for demo purposes
      const audienceData = await request.json()
      return NextResponse.json({
        audience: {
          id: crypto.randomUUID(),
          ...audienceData,
          createdAt: new Date()
        }
      })
    }

    const audienceData = await request.json()

    const { data, error } = await supabase
      .from('audiences')
      .insert({
        id: audienceData.id || crypto.randomUUID(),
        name: audienceData.name,
        age_range: audienceData.ageRange,
        gender: audienceData.gender,
        income: audienceData.income,
        interests: audienceData.interests,
        location: audienceData.location,
        education: audienceData.education,
        lifestyle: audienceData.lifestyle,
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create audience: ${error.message}`)
    }

    const audience: Audience = {
      id: data.id,
      name: data.name,
      ageRange: data.age_range,
      gender: data.gender,
      income: data.income,
      interests: data.interests,
      location: data.location,
      education: data.education,
      lifestyle: data.lifestyle,
      createdAt: new Date(data.created_at)
    }

    return NextResponse.json({ audience })
  } catch (error) {
    console.error('Error creating audience:', error)
    return NextResponse.json(
      { error: 'Failed to create audience' },
      { status: 500 }
    )
  }
}
