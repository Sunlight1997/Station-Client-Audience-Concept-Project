'use client'

import { useState } from 'react'
import { Audience } from '../types'
import { ApiService } from '../lib/api'

interface AudienceFormProps {
  onAudienceCreated: (audience: Audience) => void
}

export function AudienceForm({ onAudienceCreated }: AudienceFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    ageRange: '',
    gender: '',
    income: '',
    interests: [] as string[],
    location: '',
    education: '',
    lifestyle: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const interestOptions = [
    'Technology', 'Sports', 'Travel', 'Fashion', 'Food & Cooking',
    'Music', 'Art & Design', 'Fitness', 'Gaming', 'Reading',
    'Movies & TV', 'Photography', 'Gardening', 'Pets', 'Outdoor Activities'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create audience object
      const audienceData = {
        name: formData.name,
        ageRange: formData.ageRange,
        gender: formData.gender,
        income: formData.income,
        interests: formData.interests,
        location: formData.location,
        education: formData.education,
        lifestyle: formData.lifestyle
      }

      const audience = await ApiService.createAudience(audienceData)
      onAudienceCreated(audience)
      
      // Reset form
      setFormData({
        name: '',
        ageRange: '',
        gender: '',
        income: '',
        interests: [],
        location: '',
        education: '',
        lifestyle: ''
      })
    } catch (error) {
      console.error('Error creating audience:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="floating-card card-hover">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Create Target Audience
          </h3>
          <p className="text-sm text-gray-600">
            Define your ideal customer profile
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Audience Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="input-field"
            placeholder="e.g., Young Professionals"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age Range
            </label>
            <select
              name="ageRange"
              value={formData.ageRange}
              onChange={handleInputChange}
              className="input-field"
              required
            >
              <option value="">Select age range</option>
              <option value="18-24">18-24</option>
              <option value="25-34">25-34</option>
              <option value="35-44">35-44</option>
              <option value="45-54">45-54</option>
              <option value="55-64">55-64</option>
              <option value="65+">65+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="input-field"
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Income Level
            </label>
            <select
              name="income"
              value={formData.income}
              onChange={handleInputChange}
              className="input-field"
              required
            >
              <option value="">Select income</option>
              <option value="Under $30k">Under $30k</option>
              <option value="$30k-$50k">$30k-$50k</option>
              <option value="$50k-$75k">$50k-$75k</option>
              <option value="$75k-$100k">$75k-$100k</option>
              <option value="$100k-$150k">$100k-$150k</option>
              <option value="Over $150k">Over $150k</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Education
            </label>
            <select
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              className="input-field"
              required
            >
              <option value="">Select education</option>
              <option value="High School">High School</option>
              <option value="Some College">Some College</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="Doctorate">Doctorate</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="input-field"
            placeholder="e.g., Urban, Suburban, Rural"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lifestyle
          </label>
          <select
            name="lifestyle"
            value={formData.lifestyle}
            onChange={handleInputChange}
            className="input-field"
            required
          >
            <option value="">Select lifestyle</option>
            <option value="Busy Professional">Busy Professional</option>
            <option value="Family-Oriented">Family-Oriented</option>
            <option value="Student">Student</option>
            <option value="Retired">Retired</option>
            <option value="Entrepreneur">Entrepreneur</option>
            <option value="Creative">Creative</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interests (select multiple)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {interestOptions.map(interest => (
              <label key={interest} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.interests.includes(interest)}
                  onChange={() => handleInterestToggle(interest)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{interest}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || formData.interests.length === 0}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating...' : 'Create Audience'}
        </button>
      </form>
    </div>
  )
}
