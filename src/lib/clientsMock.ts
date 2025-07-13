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
    {
      name: 'Sofía Ríos',
      address: '0x9d8123acbd123abc...',
      currentBalance: '4,200 MXNB',
      riskProfile: 'Conservador',
      joinedAt: '2025-07-01',
    },
    {
      name: 'Luis Moreno',
      address: '0x888888888888abcd...',
      currentBalance: '1,800 MXNB',
      riskProfile: 'Moderado',
      joinedAt: '2025-07-02',
    },
    {
      name: 'Fernanda Torres',
      address: '0xbeef123456789...',
      currentBalance: '6,500 MXNB',
      riskProfile: 'Agresivo',
      joinedAt: '2025-07-03',
    },
    {
      name: 'Miguel Ángel Cruz',
      address: '0xdeed5678abcdef...',
      currentBalance: '2,100 MXNB',
      riskProfile: 'Moderado',
      joinedAt: '2025-07-04',
    },
    {
      name: 'Laura Mendoza',
      address: '0xa1b2c3d4e5f6g7h8...',
      currentBalance: '3,300 MXNB',
      riskProfile: 'Conservador',
      joinedAt: '2025-07-05',
    },
    {
      name: 'Jorge Navarro',
      address: '0xffeeddccbbaa9988...',
      currentBalance: '5,200 MXNB',
      riskProfile: 'Moderado',
      joinedAt: '2025-07-06',
    },
  ]
  