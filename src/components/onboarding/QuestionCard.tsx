'use client'

import React from 'react'

interface Option {
  label: string
  value: string
}

interface QuestionCardProps {
  title: string
  description?: string
  options: Option[]
  selected: string
  onChange: (value: string) => void
}

export default function QuestionCard({
  title,
  description,
  options,
  selected,
  onChange,
}: QuestionCardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      <div className="space-y-3">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-center gap-2 p-4 rounded-lg border ${
              selected === opt.value
                ? 'border-primary bg-primary/10'
                : 'border-gray-300'
            } cursor-pointer`}
          >
            <input
              type="radio"
              className="accent-primary"
              checked={selected === opt.value}
              onChange={() => onChange(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  )
}
