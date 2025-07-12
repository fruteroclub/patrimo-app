'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import QuestionCard from '@/components/onboarding/QuestionCard'
import NavigationButtons from '@/components/onboarding/NavigationButtons'
import ProgressDots from '@/components/onboarding/ProgressDots'

export default function RiskProfilePage() {
  const router = useRouter()
  const [selected, setSelected] = useState('')

  const options = [
    { label: 'Retirement', value: 'retirement' },
    { label: 'Buying a home', value: 'home' },
    { label: 'Education', value: 'education' },
    { label: 'Wealth accumulation', value: 'wealth' },
    { label: 'Other', value: 'other' },
  ]

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <ProgressDots total={3} current={0} />
      <QuestionCard
        title="What is your primary investment goal?"
        description="Select the option that best describes your main objective for investing."
        options={options}
        selected={selected}
        onChange={setSelected}
      />
      <NavigationButtons
        onNext={() => router.push('/onboarding/strategy')}
        isDisabled={!selected}
      />
    </main>
  )
}
