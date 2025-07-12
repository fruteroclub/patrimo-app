'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdvisorCard from '@/components/onboarding/AdvisorCard'
import ProgressDots from '@/components/onboarding/ProgressDots'
import { usePortalWallet } from '@/hooks/usePortalWallet'

interface Advisor {
  name: string
  title: string
  rating: number
  reviews: number
  experience: number
  specialties: string[]
  image: string
}

const advisors: Advisor[] = [
  {
    name: 'Dr. Sofia Ramirez',
    title: 'CFP®',
    rating: 4.8,
    reviews: 125,
    experience: 15,
    specialties: ['Planificación de jubilación', 'Inversiones', 'Impuestos'],
    image: '/advisors/sofia.jpg',
  },
  {
    name: 'Juan Torres',
    title: 'Asesor Financiero',
    rating: 4.7,
    reviews: 102,
    experience: 12,
    specialties: ['Cripto', 'Ahorro', 'Diversificación'],
    image: '/advisors/juan.jpg',
  },
  {
    name: 'Elena Mendoza',
    title: 'CFP®',
    rating: 4.9,
    reviews: 140,
    experience: 18,
    specialties: ['Herencia', 'Inversiones sostenibles', 'DeFi'],
    image: '/advisors/elena.jpg',
  },
]

export default function AdvisorMatchPage() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const { createWallet } = usePortalWallet()

  const handleAccept = async () => {
    const selected = advisors[index]
    localStorage.setItem('selectedAdvisor', JSON.stringify(selected))

    // Generamos la wallet con Portal
    await createWallet()

    router.push('/dashboards/portfolio')
  }

  const handleReject = () => {
    if (index + 1 < advisors.length) {
      setIndex(index + 1)
    } else {
      router.push('/dashboards/portfolio')
    }
  }

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <ProgressDots total={3} current={2} />
      <h2 className="text-xl font-semibold text-center mb-6">Encuentra a tu asesor</h2>
      <p className="text-center text-muted-foreground mb-4">
        {index + 1}/{advisors.length} matches
      </p>
      <AdvisorCard
        advisor={advisors[index]}
        onReject={handleReject}
        onAccept={handleAccept}
      />
    </main>
  )
}
