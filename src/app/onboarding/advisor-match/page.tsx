'use client'

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
    name: 'Julio Flores',
    title: 'Asesor Financiero',
    rating: 5.0,
    reviews: 37,
    experience: 10,
    specialties: ['Cripto', 'Portafolios Web3', 'Finanzas Personales'],
    image:
      'https://blue-victorious-kite-424.mypinata.cloud/ipfs/bafkreidss5ncothfz4vqzaisxmnj4gmu7uno5rf63ojilhztwnpakrlc6e',
  },
]

export default function AdvisorMatchPage() {
  const router = useRouter()
  const index = 0
  const { createWallet } = usePortalWallet()

  const handleAccept = async () => {
    const selected = advisors[index]
    localStorage.setItem('selectedAdvisor', JSON.stringify(selected))

    await createWallet()
    router.push('/dashboards/user')
  }

  const handleReject = () => {
    // Solo hay un asesor
    router.push('/dashboards/user')
  }

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <ProgressDots total={3} current={2} />
      <h2 className="text-xl font-semibold text-center mb-6">Tu asesor disponible</h2>
      <p className="text-center text-muted-foreground mb-4">
        1/1 matches
      </p>
      <AdvisorCard
        advisor={advisors[index]}
        onReject={handleReject}
        onAccept={handleAccept}
      />
    </main>
  )
}
