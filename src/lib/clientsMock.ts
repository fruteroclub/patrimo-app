// src/lib/clientsMock.ts

export interface Client {
    name: string
    address: string
    currentBalance: string
    riskProfile: string
    joinedAt: string
  }
  
  export const clients: Client[] = [
    {
      name: 'Valentín Martínez',
      address: '0xabc123def456789...',
      currentBalance: '2,500 MXNB',
      riskProfile: 'Moderado',
      joinedAt: '2025-06-27',
    },
    {
      name: 'Angel Melendez',
      address: '0xdef456abc789123...',
      currentBalance: '3,800 MXNB',
      riskProfile: 'Agresivo',
      joinedAt: '2025-06-30',
    },
  ]
  