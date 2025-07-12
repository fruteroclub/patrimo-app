'use client'

import React from 'react'

interface NavigationButtonsProps {
  onNext: () => void
  onBack?: () => void
  nextLabel?: string
  isDisabled?: boolean
}

export default function NavigationButtons({
  onNext,
  onBack,
  nextLabel = 'Continue',
  isDisabled = false,
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between mt-8">
      {onBack ? (
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-md bg-gray-100 text-gray-700"
        >
          Back
        </button>
      ) : (
        <div />
      )}
      <button
        onClick={onNext}
        disabled={isDisabled}
        className={`px-6 py-2 rounded-md ${
          isDisabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-primary text-white'
        }`}
      >
        {nextLabel}
      </button>
    </div>
  )
}
