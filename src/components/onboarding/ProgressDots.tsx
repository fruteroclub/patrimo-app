'use client'

import React from 'react'

interface ProgressDotsProps {
  total: number
  current: number
}

export default function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex justify-center gap-2 mb-4">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full ${
            index === current ? 'bg-primary' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  )
}
