'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageSquareReply } from 'lucide-react'

const mockMessages = [
  {
    sender: 'Ana López',
    text: '¿Cuándo tenemos la siguiente sesión?',
    date: '11 Jul 2025',
    unread: true,
  },
  {
    sender: 'Carlos Ruiz',
    text: 'Gracias por el consejo de inversión 🙏',
    date: '10 Jul 2025',
    unread: false,
  },
]

export default function Messages() {
  return (
    <div className="space-y-4">
      {mockMessages.map((msg, index) => (
        <Card key={index} className="hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg">
                {msg.unread && <Badge variant="destructive" className="mr-2">Nuevo</Badge>}
                {msg.sender}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{msg.date}</p>
            </div>
            <Button size="sm" variant="outline">
              <MessageSquareReply className="w-4 h-4 mr-2" />
              Responder
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">{msg.text}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
