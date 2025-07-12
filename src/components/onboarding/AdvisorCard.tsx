'use client'

import React from 'react'
import Image from 'next/image'

interface Advisor {
  name: string
  title: string
  rating: number
  reviews: number
  experience: number
  specialties: string[]
  image: string
}

interface AdvisorCardProps {
  advisor: Advisor
  onReject: () => void
  onAccept: () => void
}

export default function AdvisorCard({ advisor, onReject, onAccept }: AdvisorCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="w-48 h-48 relative rounded-lg overflow-hidden">
        <Image src={advisor.image} alt={advisor.name} fill objectFit="cover" />
      </div>
      <div>
        <h3 className="text-lg font-semibold">{advisor.name}, {advisor.title}</h3>
        <p className="text-sm text-muted-foreground">
          {advisor.rating} ★ ({advisor.reviews} reviews) · {advisor.experience} años
        </p>
        <p className="text-sm text-muted-foreground">
          Especialidades: {advisor.specialties.join(', ')}
        </p>
      </div>
      <div className="flex gap-6 mt-4">
        <button
          onClick={onReject}
          className="px-4 py-2 rounded-md bg-gray-200 text-black"
        >
          X
        </button>
        <button
          onClick={onAccept}
          className="px-4 py-2 rounded-md bg-primary text-white"
        >
          ❤️
        </button>
      </div>
    </div>
  )
}
