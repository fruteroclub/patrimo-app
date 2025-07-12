// src/app/dashboards/advisor/page.tsx

'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Insights from '@/components/advisor/Insights'
import Portfolio from '@/components/advisor/Portfolio'
import Messages from '@/components/advisor/Messages' // nombre corregido
import ClientPerformanceChart from '@/components/advisor/ClientPerformanceChart'

export default function AdvisorDashboard() {
  return (
    <div className="min-h-screen px-6 py-10 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6 text-center">Panel de Asesor</h1>

      <Tabs defaultValue="insights" className="w-full max-w-4xl mx-auto space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="portfolio">Portafolio</TabsTrigger>
          <TabsTrigger value="messages">Mensajes</TabsTrigger>
        </TabsList>

        <TabsContent value="insights">
          <div className="space-y-6">
            <Insights />
            <ClientPerformanceChart />
          </div>
        </TabsContent>

        <TabsContent value="portfolio">
          <Portfolio />
        </TabsContent>

        <TabsContent value="messages">
          <Messages />
        </TabsContent>
      </Tabs>
    </div>
  )
}
