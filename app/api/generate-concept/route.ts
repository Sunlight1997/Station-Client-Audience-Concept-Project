import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { Audience, Concept } from '../../../types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      )
    }

    const { audience } = await request.json()

    const audienceDescription = `
      Target Audience: ${audience.name}
      Demographics: ${audience.ageRange}, ${audience.gender}, ${audience.income}
      Location: ${audience.location}
      Education: ${audience.education}
      Lifestyle: ${audience.lifestyle}
      Interests: ${audience.interests.join(', ')}
    `

    const prompt = `
      You are a creative marketing strategist. Create a compelling marketing concept based on the following target audience profile.

      ${audienceDescription}

      Please generate a marketing concept that includes:
      1. A catchy, memorable title (2-6 words)
      2. A detailed description (2-3 paragraphs) that explains:
         - The core marketing message
         - How it appeals to this specific audience
         - The emotional or rational benefits
         - Suggested implementation approach

      Make the concept specific, actionable, and tailored to the audience's demographics, interests, and lifestyle. Focus on what would resonate with them and drive engagement.

      Format your response as JSON with "title" and "description" fields.
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a creative marketing strategist who creates compelling, audience-specific marketing concepts. Always respond with valid JSON containing 'title' and 'description' fields."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 1000,
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    const conceptData = JSON.parse(response)
    
    return NextResponse.json({
      title: conceptData.title,
      description: conceptData.description
    })

  } catch (error) {
    console.error('Error generating concept:', error)
    
    // Fallback: Generate mock concept when API fails
    const { audience } = await request.json()
    
    const mockConcept = generateMockConcept(audience)
    
    return NextResponse.json({
      title: mockConcept.title,
      description: mockConcept.description,
      isMock: true // Flag to indicate this is a mock concept
    })
  }
}

// Mock concept generator for when API is unavailable
function generateMockConcept(audience: any) {
  const concepts = [
    {
      title: "Connect & Conquer",
      description: `A community-driven campaign that taps into ${audience.interests.join(' and ')} enthusiasts. This concept leverages the power of social connection and shared interests to create authentic brand experiences. By hosting exclusive events, online forums, and user-generated content challenges, we'll build a loyal community around your brand. The campaign focuses on creating moments of genuine connection that resonate with ${audience.ageRange} ${audience.lifestyle.toLowerCase()} individuals who value authentic experiences over traditional advertising.`
    },
    {
      title: "Smart & Simple",
      description: `A streamlined approach that speaks directly to busy ${audience.lifestyle.toLowerCase()} professionals. This concept emphasizes convenience, efficiency, and smart solutions that fit seamlessly into their daily routines. The messaging focuses on how your product or service saves time and reduces complexity, appealing to the practical mindset of ${audience.education.toLowerCase()} educated individuals who appreciate quality and reliability. The campaign uses clean, minimalist design and clear value propositions that cut through the noise.`
    },
    {
      title: "Rise & Shine",
      description: `An aspirational campaign that motivates ${audience.ageRange} individuals to pursue their goals and dreams. This concept taps into the ambition and drive of ${audience.lifestyle.toLowerCase()} people who are building their careers and personal lives. The messaging emphasizes growth, achievement, and the journey toward success, positioning your brand as a partner in their personal development. The campaign uses inspiring visuals and stories that resonate with people who are actively working toward their future goals.`
    },
    {
      title: "Local & Loyal",
      description: `A community-focused campaign that celebrates local connections and authentic relationships. This concept appeals to ${audience.location.toLowerCase()} residents who value community ties and local businesses. The messaging emphasizes trust, reliability, and the importance of supporting local communities. The campaign uses local influencers, community events, and neighborhood-focused content that resonates with people who take pride in their local area and want to support businesses that contribute to their community.`
    },
    {
      title: "Tech & Touch",
      description: `A modern campaign that balances cutting-edge technology with human connection. This concept appeals to ${audience.interests.includes('Technology') ? 'tech-savvy' : 'modern'} individuals who appreciate innovation but still value personal relationships. The messaging emphasizes how technology can enhance human experiences rather than replace them. The campaign uses sleek, modern design and showcases how your product or service brings people together in meaningful ways.`
    }
  ]

  return concepts[Math.floor(Math.random() * concepts.length)]
}
