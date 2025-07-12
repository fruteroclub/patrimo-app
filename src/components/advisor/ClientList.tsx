'use client'

import { useState } from 'react'
import { clients, Client } from '@/lib/clientsMock'
import { Button } from '@/components/ui/button'
import ProposeModal from './ProposeModal'

export default function ClientList() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  return (
    <div className="space-y-4">
      {clients.map((client: Client) => (
        <div
          key={client.address}
          className="border rounded-xl p-4 flex items-center justify-between"
        >
          <div>
            <p className="font-semibold">{client.name}</p>
            <p className="text-sm text-muted-foreground">
              Balance: {client.currentBalance} · Perfil: {client.riskProfile}
            </p>
          </div>
          <Button onClick={() => setSelectedClient(client)}>
            Sugerir movimiento
          </Button>
        </div>
      ))}

      {selectedClient && (
        <ProposeModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </div>
  )
}
