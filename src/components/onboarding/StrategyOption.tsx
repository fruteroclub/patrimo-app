'use client'

import React from 'react'

interface StrategyOptionProps {
  label: string
  icon: React.ReactNode
  selected: boolean
  onClick: () => void
}

export default function StrategyOption({
  label,
  icon,
  selected,
  onClick,
}: StrategyOptionProps) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-xl border cursor-pointer transition ${
        selected ? 'border-primary bg-primary/10' : 'border-gray-300'
      }`}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <span className="font-medium">{label}</span>
    </div>
  )
}
